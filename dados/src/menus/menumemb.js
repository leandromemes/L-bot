/**
 * ╔═╗ ╔═╗ ╔╦╗ ╦ ╔═╗ ╔═╗      ╔╗  ╔═╗ ╔╦╗
 * ║ ╦ ║ ║  ║  ║ ║    ╠═╣      ╠╩╗ ║ ║  ║ 
 * ╚═╝ ╚═╝  ╩  ╩ ╚═╝ ╩ ╩      ╚═╝ ╚═╝  ╩ 
 * @author Leandro Rocha
 * @project Gotica Bot - Nazuna
 */

export default async function menuMembros(prefix, botName = "MeuBot", userName = "Usuário") {
    // Variáveis fixas para travar o estilo visual da realeza
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟"; // Padronizado para a Coroa
    const separatorIcon = "❁"; // Flor nos separadores
    const middleBorder = "┊";

    // Títulos das Categorias
    const perfilMenuTitle = "👤 PERFIL & ESTATÍSTICAS";
    const botStatusMenuTitle = "🤖 STATUS DO BOT";
    const personalMenuTitle = "⚙️ CONFIGURAÇÕES PESSOAIS";
    const rankMenuTitle = "🏆 RANKINGS & GAMIFICAÇÃO";
    const gamingMenuTitle = "🎮 CONTEÚDO GAMER";
    const socialMenuTitle = "👬 INTERAÇÃO SOCIAL";
    const achievementsMenuTitle = "⭐ CONQUISTAS & PRESENTES";
    const reputationMenuTitle = "⚖️ REPUTAÇÃO & DENÚNCIAS";

    // Header com o Rei 🤴 e a borda de Flor ❁
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

    return `${header}

${menuTopBorder}${separatorIcon} *${perfilMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}perfil
${middleBorder}${menuItemIcon}${prefix}meustatus
${bottomBorder}

${menuTopBorder}${separatorIcon} *${botStatusMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}ping
${middleBorder}${menuItemIcon}${prefix}statusbot
${middleBorder}${menuItemIcon}${prefix}statusgp
${middleBorder}${menuItemIcon}${prefix}regras
${middleBorder}${menuItemIcon}${prefix}zipbot
${middleBorder}${menuItemIcon}${prefix}gitbot
${bottomBorder}

${menuTopBorder}${separatorIcon} *${personalMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}mention
${middleBorder}${menuItemIcon}${prefix}afk
${middleBorder}${menuItemIcon}${prefix}voltei
${bottomBorder}

${menuTopBorder}${separatorIcon} *${socialMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}roles
${middleBorder}${menuItemIcon}${prefix}role.vou
${middleBorder}${menuItemIcon}${prefix}role.nvou
${middleBorder}${menuItemIcon}${prefix}role.confirmados
${bottomBorder}

${menuTopBorder}${separatorIcon} *${rankMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}rankativo
${middleBorder}${menuItemIcon}${prefix}rankinativo
${middleBorder}${menuItemIcon}${prefix}rankativos
${middleBorder}${menuItemIcon}${prefix}atividade
${middleBorder}${menuItemIcon}${prefix}checkativo
${middleBorder}${menuItemIcon}${prefix}totalcmd
${middleBorder}${menuItemIcon}${prefix}topcmd
${bottomBorder}

${menuTopBorder}${separatorIcon} *${achievementsMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}conquistas
${middleBorder}${menuItemIcon}${prefix}caixa diaria
${middleBorder}${menuItemIcon}${prefix}caixa rara
${middleBorder}${menuItemIcon}${prefix}caixa lendaria
${middleBorder}${menuItemIcon}${prefix}presente @user <tipo>
${middleBorder}${menuItemIcon}${prefix}inv
${bottomBorder}

${menuTopBorder}${separatorIcon} *${reputationMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}rep + @user
${middleBorder}${menuItemIcon}${prefix}rep - @user
${middleBorder}${menuItemIcon}${prefix}rep @user
${middleBorder}${menuItemIcon}${prefix}toprep
${middleBorder}${menuItemIcon}${prefix}denunciar @user <motivo>
${middleBorder}${menuItemIcon}${prefix}denuncias
${bottomBorder}

${menuTopBorder}${separatorIcon} *${gamingMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}likeff
${middleBorder}${menuItemIcon}${prefix}infoff
${bottomBorder}
`;
}