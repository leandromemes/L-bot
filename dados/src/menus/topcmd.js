/**
 * ╔═╗ ╔═╗ ╔╦╗ ╦ ╔═╗ ╔═╗      ╔╗  ╔═╗ ╔╦╗
 * ║ ╦ ║ ║  ║  ║ ║    ╠═╣      ╠╩╗ ║ ║  ║ 
 * ╚═╝ ╚═╝  ╩  ╩ ╚═╝ ╩ ╩      ╚═╝ ╚═╝  ╩ 
 * @author Leandro Rocha
 * @project Gotica Bot - Nazuna
 */

async function menuTopCmd(prefix, botName = "MeuBot", userName = "Usuário", topCommands = []) {
    // Variáveis fixas para travar o estilo visual da realeza
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟"; // Coroa padronizada
    const separatorIcon = "❁"; // Flor padronizada
    const middleBorder = "┊";
    const infoSectionTitle = "INFORMAÇÕES";

    // Header com o Rei 🤴 e a borda de Flor ❁
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

    // Caso não haja comandos registrados
    if (!topCommands || topCommands.length === 0) {
        return `${header}

${menuTopBorder}${separatorIcon} *MAIS USADOS*
${middleBorder}
${middleBorder}📭 Nenhum comando registrado ainda.
${middleBorder}Use ${prefix}menu para ver a lista
${middleBorder}de comandos disponíveis!
${middleBorder}
${bottomBorder}`;
    }

    // Mapeamento da lista de comandos com medalhas para os top 3
    const commandsList = topCommands.map((cmd, index) => {
        const position = index + 1;
        const emoji = position <= 3 ? ['🥇', '🥈', '🥉'][index] : '🏅';
        return `${middleBorder}${emoji} ${position}º: *${prefix}${cmd.name}*\n${middleBorder}   ↳ ${cmd.count} usos por ${cmd.uniqueUsers} usuários`;
    }).join('\n');

    return `${header}

${menuTopBorder}${separatorIcon} *TOP ${topCommands.length} COMANDOS*
${commandsList}
${middleBorder}
${middleBorder}${menuItemIcon} *${infoSectionTitle}:*
${middleBorder}
${middleBorder}🔍 Use ${prefix}cmdinfo [comando]
${middleBorder}   ↳ Para ver estatísticas detalhadas
${middleBorder}   ↳ Ex: ${prefix}cmdinfo menu
${middleBorder}
${bottomBorder}`;
}

export default menuTopCmd;