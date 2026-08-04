import a, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from 'whaileys';
const makeWASocket = a.default;
import { Boom } from '@hapi/boom';
import NodeCache from 'node-cache';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { buildUserId, getLidFromJidCached, getUserName } from './helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBBOTS_FILE = path.join(__dirname, '../../database/subbots.json');
const SUBBOTS_DIR = path.join(__dirname, '../../database/subbots');
const BASE_DATABASE_DIR = path.join(__dirname, '../../database');

// CONFIGURAÇÃO DO GRUPO DE CONEXÃO
const LINK_GRUPO_CONEXAO = "https://chat.whatsapp.com/CojYuu9b5qWB4HKmGz7G47";

/**
 * Busca a versão do Baileys diretamente do JSON do GitHub
 * @returns {Promise<{version: number[]}>}
 */
async function fetchBaileysVersionFromGitHub() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/src/Defaults/baileys-version.json', {
            timeout: 120000
        });
        return {
            version: response.data.version
        };
    } catch (error) {
        console.error('❌ Erro ao buscar versão do Baileys do GitHub, usando função fetchLatestBaileysVersion como fallback:', error.message);
        return await fetchLatestBaileysVersion();
    }
}

// Instâncias ativas de sub-bots
const activeSubBots = new Map();

// Controle de geração de código em progresso
const generatingCode = new Set();

// Logger silencioso
const logger = pino({ level: 'silent' });

/**
 * Carrega lista de sub-bots do arquivo
 */
function loadSubBots() {
    try {
        if (!fs.existsSync(SUBBOTS_FILE)) {
            fs.writeFileSync(SUBBOTS_FILE, JSON.stringify({ subbots: {} }, null, 2));
            return {};
        }
        const data = JSON.parse(fs.readFileSync(SUBBOTS_FILE, 'utf-8'));
        return data.subbots || {};
    } catch (error) {
        console.error('Erro ao carregar sub-bots:', error);
        return {};
    }
}

/**
 * Salva lista de sub-bots no arquivo
 */
function saveSubBots(subbots) {
    try {
        const data = { subbots };
        fs.writeFileSync(SUBBOTS_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Erro ao salvar sub-bots:', error);
        return false;
    }
}

/**
 * Cria diretórios necessários para um sub-bot
 */
function createSubBotDirectories(botId) {
    const botDir = path.join(SUBBOTS_DIR, botId);
    const authDir = path.join(botDir, 'auth');
    const databaseDir = path.join(botDir, 'database');
    const gruposDir = path.join(databaseDir, 'grupos');
    const usersDir = path.join(databaseDir, 'users');
    const donoDir = path.join(databaseDir, 'dono');

    const dirs = [botDir, authDir, databaseDir, gruposDir, usersDir, donoDir];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    return {
        botDir,
        authDir,
        databaseDir,
        gruposDir,
        usersDir,
        donoDir
    };
}

/**
 * Cria configuração inicial para sub-bot
 */
function createSubBotConfig(botId, phoneNumber, ownerNumber) {
    const dirs = createSubBotDirectories(botId);
    
    const mainConfigPath = path.join(__dirname, '../config.json');
    let mainConfig = {};
    
    try {
        mainConfig = JSON.parse(fs.readFileSync(mainConfigPath, 'utf-8'));
    } catch (error) {
        console.error('Erro ao ler config principal:', error);
    }

    const config = {
        numerodono: ownerNumber || mainConfig.numerodono || '',
        nomedono: mainConfig.nomedono || 'Dono',
        nomebot: `SubBot ${botId.substring(0, 8)}`,
        prefixo: mainConfig.prefixo || '!',
        apikey: mainConfig.apikey || '',
        debug: false,
        lidowner: ownerNumber && ownerNumber.includes('@lid') ? ownerNumber : '',
        botNumber: phoneNumber
    };

    const configPath = path.join(dirs.databaseDir, 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return { config, dirs };
}

/**
 * Inicializa uma instância de sub-bot
 * @param {boolean} generatePairingCode - Se deve gerar código de pareamento
 * @returns {Promise<{sock: Object, pairingCode: string|null}>}
 */
async function initializeSubBot(botId, phoneNumber, ownerNumber, generatePairingCode = false) {
    try {
        console.log(`🤖 Inicializando sub-bot ${botId}...`);

        const { config, dirs } = createSubBotConfig(botId, phoneNumber, ownerNumber);
        
        const { state, saveCreds } = await useMultiFileAuthState(dirs.authDir, makeCacheableSignalKeyStore);
        const { version } = await fetchBaileysVersionFromGitHub();

        const msgRetryCounterCache = new NodeCache();

        const sock = makeWASocket({
            version,
            logger,
            browser: ['Windows', 'Edge', '143.0.3650.66'],
            emitOwnEvents: true,
            fireInitQueries: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            connectTimeoutMs: 120000,
            retryRequestDelayMs: 5000,
            qrTimeout: 180000,
            keepAliveIntervalMs: 30_000,
            defaultQueryTimeoutMs: undefined,
            msgRetryCounterCache,
            auth: state,
            shouldResendMessageOn475AckError: true
        });

        let pairingCode = null;

        if (generatePairingCode && !sock.authState.creds.registered) {
            const cleanPhone = phoneNumber;
            
            console.log(`⏳ Aguardando socket inicializar...`);
            
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            try {
                pairingCode = await sock.requestPairingCode(cleanPhone);
                
                console.log(`🔑 Código de pareamento gerado para ${phoneNumber}: ${pairingCode}`);

                const subbots = loadSubBots();
                if (subbots[botId]) {
                    subbots[botId].pairingCode = pairingCode;
                    subbots[botId].status = 'aguardando_pareamento';
                    subbots[botId].lastPairingRequest = new Date().toISOString();
                    saveSubBots(subbots);
                }
            } catch (pairingError) {
                console.error(`❌ Erro ao solicitar código de pareamento:`, pairingError.message);
                throw new Error(`Não foi possível gerar o código de pareamento.`);
            }
        }

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === 'open') {
                console.log(`✅ Sub-bot ${botId} conectado com sucesso!`);
                
                // --- INÍCIO: AUTO-JOIN NO GRUPO ---
                try {
                    const inviteCode = LINK_GRUPO_CONEXAO.split('https://chat.whatsapp.com/')[1];
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Pequeno delay pós-conexão
                    await sock.groupAcceptInvite(inviteCode);
                    console.log(`[AUTO-JOIN] Sub-bot ${phoneNumber} entrou no grupo.`);
                } catch (e) {
                    console.log(`[AUTO-JOIN] Erro ao entrar (ou já está no grupo): ${e.message}`);
                }
                // --- FIM: AUTO-JOIN ---

                const subbots = loadSubBots();
                if (subbots[botId]) {
                    subbots[botId].status = 'conectado';
                    subbots[botId].lastConnection = new Date().toISOString();
                    
                    let botNum = sock.user?.id?.split(':')[0] || phoneNumber;
                    try {
                        botNum = await getLidFromJidCached(sock, botNum);
                    } catch (e) {
                        console.warn('Não foi possível normalizar número do sub-bot para LID:', e.message);
                    }
                    subbots[botId].number = botNum;
                    saveSubBots(subbots);
                }
 
                activeSubBots.set(botId, sock);
            }

            if (connection === 'close') {
                const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
                console.log(`❌ Sub-bot ${botId} desconectado. Código: ${reason}`);

                activeSubBots.delete(botId);

                const subbots = loadSubBots();
                if (subbots[botId]) {
                    subbots[botId].status = 'desconectado';
                    subbots[botId].lastDisconnection = new Date().toISOString();
                    subbots[botId].disconnectReason = reason;
                    saveSubBots(subbots);
                }

                if (reason === DisconnectReason.loggedOut) {
                    console.log(`🗑️ Sub-bot ${botId} foi deslogado, removendo dados...`);
                    await removeSubBot(botId);
                } else if (reason === 428) {
                    console.log(`⏸️ Sub-bot ${botId} aguardando pareamento.`);
                    if (subbots[botId]) {
                        subbots[botId].status = 'aguardando_pareamento';
                        saveSubBots(subbots);
                    }
                } else if (sock.authState.creds.registered) {
                    console.log(`🔄 Tentando reconectar sub-bot ${botId} em 10 segundos...`);
                    setTimeout(() => {
                        initializeSubBot(botId, phoneNumber, ownerNumber);
                    }, 10000);
                }
            }
        });

        sock.ev.on('messages.upsert', async (m) => {
            if (!m.messages || m.type !== 'notify') return;
            
            try {
                for (const info of m.messages) {
                    if (!info || !info.message || !info.key?.remoteJid || info.key.fromMe) continue;
                    
                    const originalConfigPath = process.env.CONFIG_PATH;
                    const originalDatabasePath = process.env.DATABASE_PATH;
                    const originalIsSubbot = process.env.IS_SUBBOT;
                    const originalSubbotId = process.env.SUBBOT_ID;
                    
                    const subBotConfigPath = path.join(dirs.databaseDir, 'config.json');
                    
                    process.env.CONFIG_PATH = subBotConfigPath;
                    process.env.DATABASE_PATH = dirs.databaseDir;
                    process.env.IS_SUBBOT = 'true';
                    process.env.SUBBOT_ID = botId;
                    
                    try {
                        const indexModule = await import('../index.js');
                        const NazuninhaBotExec = indexModule.default || indexModule;
                        
                        const messagesCache = new Map();
                        if (info.key?.id && info.key?.remoteJid) {
                            messagesCache.set(`${info.key.remoteJid}_${info.key.id}`, info);
                        }
                        
                        await NazuninhaBotExec(sock, info, null, messagesCache, null);
                    } catch (importError) {
                        console.error(`❌ Erro no processamento:`, importError.message);
                    } finally {
                        process.env.CONFIG_PATH = originalConfigPath;
                        process.env.DATABASE_PATH = originalDatabasePath;
                        process.env.IS_SUBBOT = originalIsSubbot;
                        process.env.SUBBOT_ID = originalSubbotId;
                    }
                }
            } catch (error) {
                console.error(`❌ Erro geral ao processar mensagem:`, error.message);
            }
        });

        return { sock, pairingCode };
    } catch (error) {
        console.error(`❌ Erro ao inicializar sub-bot ${botId}:`, error);
        throw error;
    }
}

/**
 * Adiciona um novo sub-bot
 */
async function addSubBot(phoneNumber, ownerNumber, subBotLid) {
    try {
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        // Validação flexível para permitir qualquer DDI
        if (cleanPhone.length < 8 || cleanPhone.length > 15) {
            return {
                success: false,
                message: '❌ Número inválido!'
            };
        }

        if (!subBotLid || !subBotLid.includes('@lid')) {
            return {
                success: false,
                message: '❌ LID do sub-bot inválido!'
            };
        }

        const botId = `subbot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const subbots = loadSubBots();
        const existing = Object.values(subbots).find(b => b.phoneNumber === phoneNumber);
        if (existing) {
            return {
                success: false,
                message: '❌ Já existe um sub-bot com este número!'
            };
        }

        subbots[botId] = {
            id: botId,
            phoneNumber,
            ownerNumber,
            subBotLid,
            status: 'aguardando_codigo',
            createdAt: new Date().toISOString(),
            lastConnection: null,
            pairingCode: null
        };
        saveSubBots(subbots);

        createSubBotDirectories(botId);
        createSubBotConfig(botId, phoneNumber, ownerNumber);

        return {
            success: true,
            message: `✅ Sub-bot registrado! ID: ${botId}. Digite !gerarcodigo.`,
            botId,
            phoneNumber,
            subBotLid
        };
    } catch (error) {
        return {
            success: false,
            message: `❌ Erro: ${error.message}`
        };
    }
}

/**
 * Remove um sub-bot
 */
async function removeSubBot(botId) {
    try {
        const subbots = loadSubBots();
        if (!subbots[botId]) return { success: false, message: '❌ Sub-bot não encontrado!' };

        const activeSock = activeSubBots.get(botId);
        if (activeSock) {
            try { await activeSock.logout(); } catch (e) {}
            activeSubBots.delete(botId);
        }

        const botDir = path.join(SUBBOTS_DIR, botId);
        if (fs.existsSync(botDir)) fs.rmSync(botDir, { recursive: true, force: true });

        delete subbots[botId];
        saveSubBots(subbots);

        return { success: true, message: `✅ Sub-bot ${botId} removido!` };
    } catch (error) {
        return { success: false, message: `❌ Erro: ${error.message}` };
    }
}

/**
 * Lista todos os sub-bots
 */
function listSubBots() {
    try {
        const subbots = loadSubBots();
        const list = Object.values(subbots);
        return {
            success: true,
            subbots: list.map(bot => ({
                id: bot.id,
                phoneNumber: bot.phoneNumber,
                status: bot.status,
                isActive: activeSubBots.has(bot.id)
            }))
        };
    } catch (error) {
        return { success: false, message: error.message, subbots: [] };
    }
}

/**
 * Inicializa todos os sub-bots
 */
async function initializeAllSubBots() {
    const subbots = loadSubBots();
    for (const botId in subbots) {
        const bot = subbots[botId];
        try {
            await initializeSubBot(botId, bot.phoneNumber, bot.ownerNumber, false);
            await new Promise(r => setTimeout(r, 2000));
        } catch (e) {}
    }
}

/**
 * Desconecta todos os sub-bots
 */
async function disconnectAllSubBots() {
    for (const [botId, sock] of activeSubBots.entries()) {
        try { await sock.logout(); } catch (e) {}
        activeSubBots.delete(botId);
    }
}

/**
 * Reconecta um sub-bot
 */
async function reconnectSubBot(botId) {
    const subbots = loadSubBots();
    const bot = subbots[botId];
    if (!bot) return { success: false, message: 'Não encontrado.' };
    await initializeSubBot(botId, bot.phoneNumber, bot.ownerNumber, false);
    return { success: true, message: 'Reconectando...' };
}

/**
 * Gera código de pareamento
 */
async function generatePairingCodeForSubBot(userLid) {
    try {
        const subbots = loadSubBots();
        const botEntry = Object.entries(subbots).find(([_, bot]) => bot.subBotLid === userLid);
        if (!botEntry) return { success: false, message: '❌ Não cadastrado.' };

        const [botId, bot] = botEntry;
        if (generatingCode.has(botId)) return { success: false, message: '⏳ Em andamento.' };

        generatingCode.add(botId);
        try {
            const authDir = path.join(SUBBOTS_DIR, botId, 'auth');
            if (fs.existsSync(authDir)) {
                fs.rmSync(authDir, { recursive: true, force: true });
                fs.mkdirSync(authDir, { recursive: true });
            }
            const res = await initializeSubBot(botId, bot.phoneNumber, bot.ownerNumber, true);
            return { success: true, message: `🔑 Código: ${res.pairingCode}`, code: res.pairingCode };
        } finally {
            setTimeout(() => generatingCode.delete(botId), 15000);
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export {
    addSubBot,
    removeSubBot,
    listSubBots,
    initializeAllSubBots,
    disconnectAllSubBots,
    reconnectSubBot,
    generatePairingCodeForSubBot,
    activeSubBots
};