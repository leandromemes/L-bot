export default async function menu(prefix, botName = "MeuBot", userName = "Usuário") {
    // Definimos as variáveis aqui dentro para garantir que ninguém as mude de fora
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟";
    const separatorIcon = "❁";
    const middleBorder = "┊";
    const dono = "༄ Đev Šoberano ×͜×";

    // O Header com o seu emoji de Rei
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n${bottomBorder}\n\n👑 *Dono:* ${dono}`;

    return `${header}

${menuTopBorder}${separatorIcon} *LISTA DE MENU*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}menubn
${middleBorder}${menuItemIcon}${prefix}menuadm
${middleBorder}${menuItemIcon}${prefix}menudown
${middleBorder}${menuItemIcon}${prefix}menulogos
${middleBorder}${menuItemIcon}${prefix}menudono
${middleBorder}${menuItemIcon}${prefix}menumemb
${middleBorder}${menuItemIcon}${prefix}ferramentas
${middleBorder}${menuItemIcon}${prefix}menufig
${middleBorder}${menuItemIcon}${prefix}alteradores
${middleBorder}${menuItemIcon}${prefix}menurpg
${middleBorder}${menuItemIcon}${prefix}menuvip
${middleBorder}${menuItemIcon}${prefix}menuia
${bottomBorder}`;

}