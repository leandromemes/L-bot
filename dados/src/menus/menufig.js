/**
 * ╔═╗ ╔═╗ ╔╦╗ ╦ ╔═╗ ╔═╗      ╔╗  ╔═╗ ╔╦╗
 * ║ ╦ ║ ║  ║  ║ ║    ╠═╣      ╠╩╗ ║ ║  ║ 
 * ╚═╝ ╚═╝  ╩  ╩ ╚═╝ ╩ ╩      ╚═╝ ╚═╝  ╩ 
 * @author Leandro Rocha
 * @project Gotica Bot - Nazuna
 */

async function menuSticker(prefix, botName = "MeuBot", userName = "Usuário") {
    // Variáveis fixas para blindar o visual da realeza
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟"; // Coroa nos comandos
    const separatorIcon = "❁"; // Flor nos separadores
    const middleBorder = "┊";

    // Títulos das Categorias
    const createStickerMenuTitle = "🎨 CRIAÇÃO DE FIGURINHAS";
    const managementMenuTitle = "⚙️ GERENCIAMENTO DE FIGURINHAS";

    // Header com o Rei 🤴 e a borda de Flor ❁
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

    return `${header}

${menuTopBorder}${separatorIcon} *${createStickerMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}emojimix
${middleBorder}${menuItemIcon}${prefix}ttp
${middleBorder}${menuItemIcon}${prefix}attp
${middleBorder}${menuItemIcon}${prefix}sticker
${middleBorder}${menuItemIcon}${prefix}sticker2
${middleBorder}${menuItemIcon}${prefix}sbg
${middleBorder}${menuItemIcon}${prefix}sfundo
${middleBorder}${menuItemIcon}${prefix}qc
${bottomBorder}

${menuTopBorder}${separatorIcon} *${managementMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}figualeatoria
${middleBorder}${menuItemIcon}${prefix}figurinhas
${middleBorder}${menuItemIcon}${prefix}rename
${middleBorder}${menuItemIcon}${prefix}rgtake
${middleBorder}${menuItemIcon}${prefix}take
${middleBorder}${menuItemIcon}${prefix}toimg
${bottomBorder}
`;
}

export default menuSticker;