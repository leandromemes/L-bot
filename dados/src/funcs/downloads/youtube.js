/**
 * YouTube.js - Versão Blindada Soberano 👑
 * Local: dados/src/funcs/downloads/YouTube.js
 * INTEGRAÇÃO TOTAL: Spider-X (Paga) + Fallback Seguro
 */

import yts from 'yt-search';
import axios from 'axios';

const CONFIG = {
    API_PLAY: 'https://api.spiderx.com.br/api/downloads/play-audio',
    API_LINK: 'https://api.spiderx.com.br/api/downloads/yt-mp3',
    SPIDER_KEY: '3edfB5m8XuOFVPijpgGE', 
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
        let s = { ok: false };
        
        // Se não for URL, faz a busca para garantir que o index.js receba os dados do vídeo
        if (!isUrl) {
            s = await search(url_or_query);
            if (!s.ok) return s;
        }

        const queryFinal = isUrl ? url_or_query : s.data.title;
        const endpoint = isUrl ? CONFIG.API_LINK : CONFIG.API_PLAY;
        const param = isUrl ? 'url' : 'search';

        // --- TENTATIVA 1: SPIDER-X ---
        try {
            console.log(`🚀 Spider-X: Solicitando via ${param}...`);
            const resSpider = await axios.get(`${endpoint}?${param}=${encodeURIComponent(queryFinal)}&api_key=${CONFIG.SPIDER_KEY}`, { 
                timeout: CONFIG.TIMEOUT 
            });
            
            const result = resSpider.data;
            const downloadUrl = result?.url;

            if (downloadUrl) {
                const buffer = await getBuffer(downloadUrl);
                if (buffer) {
                    return { 
                        ok: true, 
                        buffer, 
                        filename: `${(result.title || s.data?.title || 'audio').replace(/[^\w\s]/gi, '')}.mp3`, 
                        title: result.title || s.data?.title || 'YouTube Audio', 
                        thumbnail: result.thumbnail || s.data?.thumbnail || '',
                        author: result.channel?.name || s.data?.author || 'YouTube',
                        videoId: s.data?.videoId || ''
                    };
                }
            }
        } catch (e) {
            console.log(`⚠️ Spider-X falhou: ${e.message}. Indo para reserva.`);
        }

        // --- TENTATIVA 2: API FREE (Só se tiver a URL do vídeo) ---
        const videoUrl = isUrl ? url_or_query : s.data?.url;
        if (videoUrl) {
            try {
                const resFree = await axios.get(`${CONFIG.API_FREE}${encodeURIComponent(videoUrl)}`, { timeout: 20000 });
                const freeUrl = resFree.data?.result?.download?.url;
                
                if (freeUrl) {
                    const buffer = await getBuffer(freeUrl);
                    if (buffer) return { 
                        ok: true, 
                        buffer, 
                        filename: `audio.mp3`, 
                        title: s.data?.title || 'YouTube Audio', 
                        thumbnail: s.data?.thumbnail || '',
                        author: s.data?.author || 'YouTube',
                        videoId: s.data?.videoId || ''
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