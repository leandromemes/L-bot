/**
 * YouTube.js - Versão Blindada Soberano 👑
 * Local: dados/src/funcs/downloads/youtube.js
 * INTEGRAÇÃO TOTAL: API Própria (Dev Soberano) + Fallback Seguro (Axios)
 * @author ༄ Đev Šoberano ×͜×
 * @link https://github.com/leandromemes
 * @project Gotica Bot
 */

import axios from 'axios';
import fs from 'fs';
import yts from 'yt-search';

const CONFIG = {
    API_URL: 'https://api.devsoberano.com',
    API_KEY: 'sb_bot_gotica_8f9a2b',
    API_FREE: 'https://api.vreden.my.id/api/ytmp3?url=',
    TIMEOUT: 60000,
    USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

async function getBuffer(url) {
    try {
        const res = await axios.get(url, { 
            responseType: 'arraybuffer', 
            timeout: 120000,
            headers: { 'User-Agent': CONFIG.USER_AGENT }
        });
        return Buffer.from(res.data);
    } catch (err) { 
        return null; 
    }
}

export async function search(query) {
    try {
        const r = await yts(query);
        const v = r?.videos?.[0];
        if (!v) return { ok: false, msg: 'Nada encontrado' };
        return {
            ok: true,
            data: { 
                videoId: v.videoId, 
                url: v.url,
                title: v.title, 
                thumbnail: v.thumbnail,
                timestamp: v.timestamp,
                duration: v.seconds,
                author: v.author?.name || 'YouTube' 
            }
        };
    } catch { return { ok: false, msg: 'Erro na busca' }; }
}

export async function mp3(url_or_query) {
    try {
        const isUrl = url_or_query.match(/(https?:\/\/)/gi);
        let queryFinal = url_or_query;
        let videoData = null;

        if (!isUrl) {
            const s = await search(url_or_query);
            if (!s.ok) return s;
            queryFinal = s.data.title;
            videoData = s.data;
        }

        // --- TENTATIVA 1: API PRÓPRIA (DEV SOBERANO) ---
        try {
            console.log(`🚀 Dev Soberano API: Consultando /play...`);
            const endpoint = `${CONFIG.API_URL}/play`;
            
            const resApi = await axios.get(endpoint, {
                params: {
                    search: queryFinal,
                    apikey: CONFIG.API_KEY,
                    api_key: CONFIG.API_KEY
                },
                timeout: CONFIG.TIMEOUT,
                headers: { 'User-Agent': CONFIG.USER_AGENT }
            });
            
            const data = resApi.data;
            
            if (data && (data.url || data.file)) {
                let audioBuffer = null;
                const caminhoLocal = data.file ? String(data.file).trim() : '';

                if (caminhoLocal && fs.existsSync(caminhoLocal)) {
                    audioBuffer = fs.readFileSync(caminhoLocal);
                } else if (data.url) {
                    let urlDownload = data.url.trim();
                    if (urlDownload.includes('localhost:3000')) {
                        urlDownload = urlDownload.replace('http://localhost:3000', CONFIG.API_URL);
                    }
                    audioBuffer = await getBuffer(urlDownload);
                }

                if (audioBuffer) {
                    return { 
                        ok: true, 
                        buffer: audioBuffer, 
                        filename: `${(data.title || videoData?.title || 'audio').replace(/[^\w\s]/gi, '')}.mp3`, 
                        title: data.title || videoData?.title || 'YouTube Audio', 
                        thumbnail: data.thumbnail || videoData?.thumbnail || '',
                        author: data.channel?.name || videoData?.author || 'YouTube',
                        videoId: videoData?.videoId || ''
                    };
                }
            }
        } catch (e) {
            console.log(`⚠️ API Própria falhou: ${e.message}. Indo para reserva.`);
        }

        // --- TENTATIVA 2: API FREE (Fallback) ---
        const videoUrl = isUrl ? url_or_query : videoData?.url;
        if (videoUrl) {
            try {
                const resFree = await axios.get(`${CONFIG.API_FREE}${encodeURIComponent(videoUrl)}`, { timeout: 20000 });
                const freeData = resFree.data;
                const freeUrl = freeData?.result?.download?.url;
                
                if (freeUrl) {
                    const buffer = await getBuffer(freeUrl);
                    if (buffer) return { 
                        ok: true, 
                        buffer, 
                        filename: `audio.mp3`, 
                        title: videoData?.title || 'YouTube Audio', 
                        thumbnail: videoData?.thumbnail || '',
                        author: videoData?.author || 'YouTube',
                        videoId: videoData?.videoId || ''
                    };
                }
            } catch (e) {
                console.error("❌ Falha total nas APIs.");
            }
        }

        return { ok: false, msg: 'Não foi possível baixar este áudio.' };
    } catch (err) {
        return { ok: false, msg: 'Erro crítico no processamento.' };
    }
}

export const ytmp3 = mp3;
export const ytmp4 = mp3; 
export default { search, mp3, ytmp3, ytmp4 };