const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `▬
▎ Hi  ${pushname} 👋 
▎ ${config.BOT_NAME}
▎ █ 𝗦𝗽𝗲𝗲𝗱 : 0.00119 miliseconds
▎ █ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : 24Hours × 7
▎ █ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${config.BOT_NAME} 
▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 : ${config.OWNER_NAME}
▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿 : ${config.OWNER_NUM}
▎ █ 𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲 : ${config.OWNER_NAME}
▎ █ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : linux
▎ █ 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿 : Unlimited 
   Ｍｅｎｕ Ｃｏｍｍａｎｄｓ🌀
   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ 
   *▓  Allmenu - All Menu* 📜
   *▓  Dmenu - Download Menu* 📥
   *▓  Omenu - Other Menu* 🛠️
   *▓  Aimenu - Ai Menu* 🤖
   *▓  Amenu - Anime Menu* 🌸
   *▓  Gmenu - Group Menu* 👥
   *▓  Mmenu - Main Menu* 🏠
   *▓  Cmenu - Convert Menu* 🔄
   *▓  Fmenu - Fun Menu* 🎉
   *▓  Logo <text>* 🖌️
   
▎ ️ＧＡＲＦＩＥＬＤ ＢＯＴ  Created by ${config.OWNER_NAME}  🪁
▎ ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т v10 and 
▎ 𝖭Ξ𝖴𝖱Λ𝖫 ΛＩ v1.00             
⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁
   ▎ ＧＡＲＦＩＥＬＤ ＢＯＴ
   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁
 ▁▁▁▁▁▁▁▁▁▁▁▁▁▁
▎ 
   █▄▄ █▀█ ▀█▀
   █▄█ █▄█ ░█░
⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> ${config.DESCRIPTION}`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `${config.ALIVE_IMG}` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363358310754973@newsletter',
                    newsletterName: 'GARFIELD-WHATSAPP-BOT-v10',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});