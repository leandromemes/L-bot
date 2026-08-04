/**
 * ╔═╗ ╔═╗ ╔╦╗ ╦ ╔═╗ ╔═╗      ╔╗  ╔═╗ ╔╦╗
 * ║ ╦ ║ ║  ║  ║ ║    ╠═╣      ╠╩╗ ║ ║  ║ 
 * ╚═╝ ╚═╝  ╩  ╩ ╚═╝ ╩ ╩      ╚═╝ ╚═╝  ╩ 
 * @author Leandro Rocha
 * @project Gotica Bot - Nazuna
 */

export default async function menuIa(prefix, botName = "MeuBot", userName = "Usuário") {
    // Variáveis fixas para travar o estilo visual da realeza
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟"; // Coroa nos comandos
    const separatorIcon = "❁"; // Flor nos separadores
    const middleBorder = "┊";
    const menuTitleIcon = "🍧ฺꕸ▸";

    // Títulos das Categorias
    const chatBotMenuTitle = "🤖 CHATBOTS INTELIGENTES";
    const textMenuTitle = "✍️ GERAÇÃO DE TEXTO";
    const toolsMenuTitle = "🛠️ FERRAMENTAS DE IA";
    const debateMenuTitle = "💬 DEBATES & ARGUMENTAÇÃO";
    const storyMenuTitle = "📖 HISTÓRIAS INTERATIVAS";

    // Header com o Rei 🤴 e a borda de Flor ❁
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

    return `${header}

${menuTopBorder}${separatorIcon} *${chatBotMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}gemma
${middleBorder}${menuItemIcon}${prefix}gemma2
${middleBorder}${menuItemIcon}${prefix}codegemma
${middleBorder}${menuItemIcon}${prefix}qwen
${middleBorder}${menuItemIcon}${prefix}qwen2
${middleBorder}${menuItemIcon}${prefix}qwen3
${middleBorder}${menuItemIcon}${prefix}qwencoder
${middleBorder}${menuItemIcon}${prefix}llama
${middleBorder}${menuItemIcon}${prefix}llama3
${middleBorder}${menuItemIcon}${prefix}phi
${middleBorder}${menuItemIcon}${prefix}phi3
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}yi
${middleBorder}${menuItemIcon}${prefix}kimi
${middleBorder}${menuItemIcon}${prefix}kimik2
${bottomBorder}

${menuTopBorder}${separatorIcon} *${textMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}cog
${middleBorder}${menuItemIcon}${prefix}mistral
${middleBorder}${menuItemIcon}${prefix}magistral
${middleBorder}${menuItemIcon}${prefix}baichuan
${middleBorder}${menuItemIcon}${prefix}marin
${middleBorder}${menuItemIcon}${prefix}rakutenai
${middleBorder}${menuItemIcon}${prefix}rocket
${middleBorder}${menuItemIcon}${prefix}swallow
${middleBorder}${menuItemIcon}${prefix}falcon
${bottomBorder}

${menuTopBorder}${separatorIcon} *${toolsMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}ideias
${middleBorder}${menuItemIcon}${prefix}explicar
${middleBorder}${menuItemIcon}${prefix}resumir
${middleBorder}${menuItemIcon}${prefix}corrigir
${middleBorder}${menuItemIcon}${prefix}resumirurl
${middleBorder}${menuItemIcon}${prefix}resumirchat <qtd>
${middleBorder}${menuItemIcon}${prefix}recomendar <tipo> <gênero>
${bottomBorder}

${menuTopBorder}${separatorIcon} *${debateMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}debater <tema>
${bottomBorder}

${menuTopBorder}${separatorIcon} *${storyMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}aventura <gênero>
${middleBorder}${menuItemIcon}${prefix}aventura escolha <1/2/3>
${middleBorder}${menuItemIcon}${prefix}aventura status
${middleBorder}${menuItemIcon}${prefix}aventura sair
${middleBorder}
${middleBorder}${menuTitleIcon} *Alias: historia* ${menuTitleIcon}
${bottomBorder}
`;
}