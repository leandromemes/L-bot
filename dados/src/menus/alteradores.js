/**
 * ╔═╗ ╔═╗ ╔╦╗ ╦ ╔═╗ ╔═╗      ╔╗  ╔═╗ ╔╦╗
 * ║ ╦ ║ ║  ║  ║ ║    ╠═╣      ╠╩╗ ║ ║  ║ 
 * ╚═╝ ╚═╝  ╩  ╩ ╚═╝ ╩ ╩      ╚═╝ ╚═╝  ╩ 
 * @author Leandro Rocha
 * @project Gotica Bot - Nazuna
 */

export default async function menuAlterador(prefix, botName = "MeuBot", userName = "Usuário") {
    // Variáveis fixas para travar o estilo visual da realeza
    const menuTopBorder = "╭┈";
    const bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯";
    const menuItemIcon = "•.̇𖥨֗👑⭟"; // Coroa padronizada
    const separatorIcon = "❁"; // Flor padronizada
    const middleBorder = "┊";
    const menuTitleIcon = "🍧ฺꕸ▸";

    // Títulos das Categorias
    const videoMenuTitle = "🎬 EFEITOS DE VÍDEO";
    const audioMenuTitle = "🎵 EFEITOS DE ÁUDIO";
    const imageMenuTitle = "🖼️ ALTERAR IMAGEM";

    // Header com o Rei 🤴 e a borda de Flor ❁
    const header = `╭┈⊰ 🤴 『 *${botName}* 』\n${middleBorder}Olá, ${userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

    return `${header}

${menuTopBorder}${separatorIcon} *${videoMenuTitle}*
${middleBorder}
${middleBorder}${menuTitleIcon} *EDIÇÃO BÁSICA* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}cortarvideo <inicio> <fim>
${middleBorder}${menuItemIcon}${prefix}tomp3 - Converter para áudio
${middleBorder}
${middleBorder}${menuTitleIcon} *VELOCIDADE* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}videorapido
${middleBorder}${menuItemIcon}${prefix}fastvid
${middleBorder}${menuItemIcon}${prefix}videoslow
${middleBorder}${menuItemIcon}${prefix}videolento
${middleBorder}
${middleBorder}${menuTitleIcon} *EFEITOS* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}videoreverso
${middleBorder}${menuItemIcon}${prefix}videoloop
${middleBorder}${menuItemIcon}${prefix}videomudo
${middleBorder}${menuItemIcon}${prefix}videobw
${middleBorder}${menuItemIcon}${prefix}pretoebranco
${middleBorder}${menuItemIcon}${prefix}sepia
${middleBorder}${menuItemIcon}${prefix}espelhar
${middleBorder}${menuItemIcon}${prefix}rotacionar
${bottomBorder}

${menuTopBorder}${separatorIcon} *${imageMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}rmbg
${middleBorder}${menuItemIcon}${prefix}upscale
${bottomBorder}

${menuTopBorder}${separatorIcon} *${audioMenuTitle}*
${middleBorder}
${middleBorder}${menuTitleIcon} *EDIÇÃO BÁSICA* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}cortaraudio <inicio> <fim>
${middleBorder}${menuItemIcon}${prefix}velocidade <0.5-3.0>
${middleBorder}${menuItemIcon}${prefix}speed <0.5-3.0>
${middleBorder}${menuItemIcon}${prefix}normalizar
${middleBorder}
${middleBorder}${menuTitleIcon} *MUDANÇA DE VOZ* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}boyvoice
${middleBorder}${menuItemIcon}${prefix}vozmenino
${middleBorder}${menuItemIcon}${prefix}womenvoice
${middleBorder}${menuItemIcon}${prefix}vozmulher
${middleBorder}${menuItemIcon}${prefix}manvoice
${middleBorder}${menuItemIcon}${prefix}vozhomem
${middleBorder}${menuItemIcon}${prefix}childvoice
${middleBorder}${menuItemIcon}${prefix}vozcrianca
${middleBorder}
${middleBorder}${menuTitleIcon} *EFEITOS DE VELOCIDADE* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}speedup
${middleBorder}${menuItemIcon}${prefix}vozrapida
${middleBorder}${menuItemIcon}${prefix}audiorapido
${middleBorder}${menuItemIcon}${prefix}vozlenta
${middleBorder}${menuItemIcon}${prefix}audiolento
${middleBorder}
${middleBorder}${menuTitleIcon} *EFEITOS DE BASS & GRAVE* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}bass
${middleBorder}${menuItemIcon}${prefix}bass2
${middleBorder}${menuItemIcon}${prefix}bass3
${middleBorder}${menuItemIcon}${prefix}bassbn <1-20>
${middleBorder}${menuItemIcon}${prefix}grave
${middleBorder}${menuItemIcon}${prefix}vozgrave
${middleBorder}
${middleBorder}${menuTitleIcon} *EFEITOS ESPECIAIS* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}vozeco
${middleBorder}${menuItemIcon}${prefix}eco
${middleBorder}${menuItemIcon}${prefix}vozcaverna
${middleBorder}${menuItemIcon}${prefix}reverb
${middleBorder}${menuItemIcon}${prefix}reversobn
${middleBorder}${menuItemIcon}${prefix}reverse
${middleBorder}${menuItemIcon}${prefix}audioreverso
${middleBorder}${menuItemIcon}${prefix}chorus
${middleBorder}${menuItemIcon}${prefix}phaser
${middleBorder}${menuItemIcon}${prefix}flanger
${middleBorder}${menuItemIcon}${prefix}tremolo
${middleBorder}${menuItemIcon}${prefix}vibrato
${middleBorder}
${middleBorder}${menuTitleIcon} *VOLUME & EQUALIZAÇÃO* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}volumeboost
${middleBorder}${menuItemIcon}${prefix}aumentarvolume
${middleBorder}${menuItemIcon}${prefix}equalizer
${middleBorder}${menuItemIcon}${prefix}equalizar
${middleBorder}${menuItemIcon}${prefix}overdrive
${middleBorder}${menuItemIcon}${prefix}pitch
${middleBorder}${menuItemIcon}${prefix}lowpass
${bottomBorder}
`;
}