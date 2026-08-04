/**
 * ╔═╗ ╔═╗ ╔╦╗ ╦ ╔═╗ ╔═╗      ╔╗  ╔═╗ ╔╦╗
 * ║ ╦ ║ ║  ║  ║ ║    ╠═╣      ╠╩╗ ║ ║  ║ 
 * ╚═╝ ╚═╝  ╩  ╩ ╚═╝ ╩ ╩      ╚═╝ ╚═╝  ╩ 
 * @author Leandro Rocha
 * @project Gotica Bot - Nazuna
 */

export default async function menudown(prefix, botName = "MeuBot", userName = "Usuário") {
    // Variáveis fixas para travar o estilo visual solicitado
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟"; // Coroa nos comandos
    const separatorIcon = "❁"; // Flor nos separadores
    const middleBorder = "┊";

    // Títulos das Categorias
    const searchMenuTitle = "🔍 PESQUISAS & CONSULTAS";
    const audioMenuTitle = "🎵 MÚSICA & ÁUDIO"; 
    const videoMenuTitle = "🎬 VÍDEOS & STREAMING";
    const downloadMenuTitle = "📥 DOWNLOADS";
    const mediaMenuTitle = "📱 MÍDIAS SOCIAIS";
    const gamesMenuTitle = "🎮 GAMING & APPS";

    // Header com o Rei 🤴 e a borda de Flor ❁
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

    return `${header}

${menuTopBorder}${separatorIcon} *${searchMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}google
${middleBorder}${menuItemIcon}${prefix}noticias
${middleBorder}${menuItemIcon}${prefix}apps
${middleBorder}${menuItemIcon}${prefix}dicionario
${middleBorder}${menuItemIcon}${prefix}wikipedia
${bottomBorder}

${menuTopBorder}${separatorIcon} *${audioMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}letra
${middleBorder}${menuItemIcon}${prefix}play
${middleBorder}${menuItemIcon}${prefix}play2
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}spotify
${middleBorder}${menuItemIcon}${prefix}soundcloud
${bottomBorder}

${menuTopBorder}${separatorIcon} *${videoMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}playvid
${bottomBorder}

${menuTopBorder}${separatorIcon} *${downloadMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}tiktok
${middleBorder}${menuItemIcon}${prefix}instagram
${middleBorder}${menuItemIcon}${prefix}kwai
${middleBorder}${menuItemIcon}${prefix}igstory
${middleBorder}${menuItemIcon}${prefix}facebook
${middleBorder}${menuItemIcon}${prefix}gdrive
${middleBorder}${menuItemIcon}${prefix}mediafire
${middleBorder}${menuItemIcon}${prefix}twitter
${bottomBorder}

${menuTopBorder}${separatorIcon} *${mediaMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}pinterest
${bottomBorder}

${menuTopBorder}${separatorIcon} *${gamesMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}mcplugin
${bottomBorder}
`;
}