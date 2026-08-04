// Loader ESM-safe para todos os menus - CORRIGIDO PELO GÊMINI
// Força a limpeza de cache para garantir que edições nos menus apareçam no bot.

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuModules = {
    menu: './menu.js',
    menuAlterador: './alteradores.js',
    menudown: './menudown.js',
    menuadm: './menuadm.js',
    menubn: './menubn.js',
    menuLogos: './menulogo.js', 
    menuDono: './menudono.js',
    menuMembros: './menumemb.js',
    menuFerramentas: './ferramentas.js',
    menuSticker: './menufig.js',
    menuIa: './menuia.js',
    menuTopCmd: './topcmd.js',
    menuRPG: './menurpg.js',
    menuVIP: './menuvip.js'
};

async function loadMenus() {
    const menus = {};
    // Timestamp para burlar o cache do ESM import
    const cacheBuster = `?update=${Date.now()}`;

    for (const [name, relPath] of Object.entries(menuModules)) {
        try {
            // Adicionamos o cacheBuster na URL para forçar o Node a ler o arquivo novo
            const moduleUrl = new URL(relPath + cacheBuster, import.meta.url);
            const mod = await import(moduleUrl);
            const fn = mod.default || mod[name];

            if (typeof fn === 'function') {
                menus[name] = fn;
            } else {
                console.error(`[AVISO] Menu '${name}' não exporta função válida.`);
            }
        } catch (err) {
            console.error(`[ERRO] Falha ao carregar o menu '${name}': ${err.message}`);
        }
    }
    return menus;
}

export async function getMenus() {
    return await loadMenus();
}

// Exporta os menus carregados na hora
const menus = await loadMenus();
export default menus;