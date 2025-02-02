const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const fs = require('fs');
const googleTTS = require('google-tts-api');
const { runtime } = require('../lib/functions');
const axios = require('axios');
 

// dlmenu
cmd({
    pattern: "dmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const menu = `░░░ *ＤＯＷＮＬＯＡＤ ＭＥＮＵ* ░░░\n\n◦ *Facebook* 📘  \n   _Example:_ facebook [Query]  \n◦ *fb* 🌐  \n   _Example:_ fb [Query]  \n◦ *Mediafire* 📂  \n   _Example:_ mediafire [Query]  \n◦ *TikTok* 🎵  \n   _Example:_ tiktok [Query]  \n◦ *tt* 📲  \n   _Example:_ tt [Query]  \n◦ *Twitter* 🐦  \n   _Example:_ twitter [Query]  \n◦ *Instagram* 📸  \n   _Example:_ insta [Query]  \n◦ *Insta* 🌟  \n   _Example:_ insta [Query]  \n◦ *APK* 📱  \n   _Example:_ apk [Query]  \n◦ *Images* 🖼️  \n   _Example:_ img [Query]  \n◦ *img* 🌠  \n   _Example:_ img [Query]  \n◦ *song* 🎧  \n   _Example:_ spotify [Query]  \n◦ *Spotify* 🎧  \n   _Example:_ spotify [Query]  \n◦ *vid* 🎬  \n   _Example:_ video [Query]  \n◦ *Play* 🎮  \n   _Example:_ play [Query]  \n◦ *play2* ⚡  \n   _Example:_ play2 [Query]  \n◦ *play5* 🚀  \n   _Example:_ play5 [Query]  \n◦ *Video* 🎥  \n   _Example:_ video [Query]  \n◦ *video2* 🎬  \n   _Example:_ video2 [Query]  \n◦ *Drama* 🎭  \n   _Example:_ drama [Query]  \n◦ *YouTube MP3* 🎶  \n   _Example:_ ytmp3 [Query]  \n◦ *ytmp3* 🎧  \n◦ *YouTube MP4* 📺  \n   _Example:_ ytmp4 [Query]  \n◦ *ytmp4* 📼  \n◦ *Git* 💻  \n   _Example:_ git [Query]  \n◦ *Google Drive* 📂  \n   _Example:_ gdrive [Query]  \n◦ *gdrive* 📁  \n   _Example:_ gdrive [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢᴀʀꜰɪᴇʟᴅ ʙᴏᴛ`;
 await conn.sendMessage(from, { 
      image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
      caption: menu
    }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
// group menu

cmd({
    pattern: "gmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try
       {
        let dec =   `░░░ *𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨* ░░░\n\n◦ *grouplink* 🔗  \n   _Example:_ grouplink [Query]  \n◦ *kickall* 🚫  \n   _Example:_ kickall [Query]  \n◦ *kickall2* 🚫  \n   _Example:_ kickall2 [Query]  \n◦ *kickall3* 🚫  \n   _Example:_ kickall3 [Query]  \n◦ *add* ➕  \n   _Example:_ add [Query]  \n◦ *remove* ➖  \n   _Example:_ remove [Query]  \n◦ *kick* 👢  \n   _Example:_ kick [Query]  \n◦ *promote* ⬆️  \n   _Example:_ promote [Query]  \n◦ *demote* ⬇️  \n   _Example:_ demote [Query]  \n◦ *dismiss* 🚪  \n   _Example:_ dismiss [Query]  \n◦ *revoke* ⛔  \n   _Example:_ revoke [Query]  \n◦ *setgoodbye* 👋  \n   _Example:_ setgoodbye [Query]  \n◦ *setwelcome* 🎉  \n   _Example:_ setwelcome [Query]  \n◦ *delete* 🗑️  \n   _Example:_ delete [Query]  \n◦ *getpic* 📸  \n   _Example:_ getpic [Query]  \n◦ *ginfo* ℹ️  \n   _Example:_ ginfo [Query]  \n◦ *disappear on* 🌟  \n   _Example:_ disappear on [Query]  \n◦ *disappear off* 💨  \n   _Example:_ disappear off [Query]  \n◦ *disappear 7D,24H* ⏰  \n   _Example:_ disappear 7D,24H [Query]  \n◦ *allreq* 🌐  \n   _Example:_ allreq [Query]  \n◦ *updategname* 📝  \n   _Example:_ updategname [Query]  \n◦ *updategdesc* 📄  \n   _Example:_ updategdesc [Query]  \n◦ *joinrequests* 📩  \n   _Example:_ joinrequests [Query]  \n◦ *senddm* ✉️  \n   _Example:_ senddm [Query]  \n◦ *nikal* 🚪  \n   _Example:_ nikal [Query]  \n◦ *mute* 🔇  \n   _Example:_ mute [Query]  \n◦ *unmute* 🔊  \n   _Example:_ unmute [Query]  \n◦ *lockgc* 🔒  \n   _Example:_ lockgc [Query]  \n◦ *unlockgc* 🔓  \n   _Example:_ unlockgc [Query]  \n◦ *invite* ✉️  \n   _Example:_ invite [Query]  \n◦ *tag* 🏷️  \n   _Example:_ tag [Query]  \n◦ *hidetag* 👀  \n   _Example:_ hidetag [Query]  \n◦ *tagall* 📢  \n   _Example:_ tagall [Query]  \n◦ *tagadmins* 🛡️  \n   _Example:_ tagadmins [Query]  \n✦\n░░░ n${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',             newsletterName: 'ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "fmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {

        let dec = `░░░ 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 ░░░\n\n◦ *insult* 🗣️  \n   _Example:_ insult [Query]  \n◦ *pickup* 💬  \n   _Example:_ pickup [Query]  \n◦ *ship* 🚢  \n   _Example:_ ship [Query]  \n◦ *character* 🎭  \n   _Example:_ character [Query]  \n◦ *hack* 💻  \n   _Example:_ hack [Query]  \n◦ *joke* 😂  \n   _Example:_ joke [Query]  \n◦ *hrt* 💔  \n   _Example:_ hrt [Query]  \n◦ *hpy* 😊  \n   _Example:_ hpy [Query]  \n◦ *syd* 😢  \n   _Example:_ syd [Query]  \n◦ *anger* 😡  \n   _Example:_ anger [Query]  \n◦ *shy* 😳  \n   _Example:_ shy [Query]  \n◦ *kiss* 💋  \n   _Example:_ kiss [Query]  \n◦ *mon* 👾  \n   _Example:_ mon [Query]  \n◦ *cunfuzed* 😕  \n   _Example:_ cunfuzed [Query]  \n◦ *setpp* 📸  \n   _Example:_ setpp [Query]  \n◦ *hand* 🤚  \n   _Example:_ hand [Query]  \n◦ *nikal* 🚪  \n   _Example:_ nikal [Query]  \n◦ *hold* ✋  \n   _Example:_ hold [Query]  \n◦ *hug* 🤗  \n   _Example:_ hug [Query]  \n◦ *hifi* ✋  \n   _Example:_ hifi [Query]  \n◦ *poke* 👉  \n   _Example:_ poke [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',             newsletterName: 'ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu

cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        let dec = `░░ ⬤ 𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂 ⬤ ░░\n\n◦ *vv* 🎥  \n   _Example:_ vv [Query]  \n◦ *pair* 💑  \n   _Example:_ pair [Query]  \n◦ *pair2* 💏  \n   _Example:_ pair2 [Query]  \n◦ *fact* 📜  \n   _Example:_ fact [Query]  \n◦ *fancy* ✨  \n   _Example:_ fancy [Query]  \n◦ *define* 📖  \n   _Example:_ define [Query]  \n◦ *news* 📰  \n   _Example:_ news [Query]  \n◦ *movie* 🎬  \n   _Example:_ movie [Query]  \n◦ *weather* 🌤️  \n   _Example:_ weather [Query]  \n◦ *srepo* 📑  \n   _Example:_ srepo [Query]  \n◦ *insult* 🗣️  \n   _Example:_ insult [Query]  \n◦ *save* 💾  \n   _Example:_ save [Query]  \n◦ *wikipedia* 🌐  \n   _Example:_ wikipedia [Query]  \n◦ *gpass* 🔑  \n   _Example:_ gpass [Query]  \n◦ *githubstalk* 🕵️  \n   _Example:_ githubstalk [Query]  \n◦ *yts link* 📎  \n   _Example:_ yts link [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}` ;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',             newsletterName: 'ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        // Send voice message from data/ai.mp3
        const voiceFilePath = 'data/ai.mp3';
        let desc = `▬\n▎ Hi ${pushname} 👋 \n▎ ${config.BOT_NAME}\n▎ █ 𝗦𝗽𝗲𝗲𝗱: 0.00119 milliseconds\n▎ █ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: 24 Hours × 7\n▎ █ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${config.BOT_NAME} \n▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}\n▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿: ${config.OWNER_NUMBER}\n▎ █ 𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}\n▎ █ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: linux\n▎ █ 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿: Unlimited \n   Ｍｅｎｕ Ｃｏｍｍａｎｄｓ🌀\n   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ \n   *▓  Allmenu - All Menu* 📜\n   *▓  Dmenu - Download Menu* 📥\n   *▓  Omenu - Other Menu* 🛠️\n   *▓  Aimenu - Ai Menu* 🤖\n   *▓  Amenu - Anime Menu* 🌸\n   *▓  Gmenu - Group Menu* 👥\n   *▓  Mmenu - Main Menu* 🏠\n   *▓  Cmenu - Convert Menu* 🔄\n   *▓  Fmenu - Fun Menu* 🎉\n   *▓  Logo <text>* 🖌️\n\n▎ ️ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т Created by ${config.OWNER_NAME} 🪁\n▎ ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т v10 and \n▎ 𝖭Ξ𝖴𝖱Λ𝖫 ΛＩ v1.00             \n⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т\n▎ ▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ \n█▄▄ █▀█ ▀█▀\n█▄█ █▄█ ░█░\n⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            audio: { url: voiceFilePath },
            mimetype: "audio/mp4",
            ptt: true
        }, { quoted: mek });

        // Generate and send menu message

        await conn.sendMessage(from, { image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' }, caption: desc }, { quoted: mek });
, 
        

    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
//Alive 

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        // Send voice message from data/ai.mp3
        const voiceFilePath = 'data/ai.mp3';
        let desc = `▬\n▎ Hi ${pushname} 👋 \n▎ ${config.BOT_NAME}\n▎ █ 𝗦𝗽𝗲𝗲𝗱: 0.00119 milliseconds\n▎ █ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: 24 Hours × 7\n▎ █ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${config.BOT_NAME} \n▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}\n▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿: ${config.OWNER_NUMBER}\n▎ █ 𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}\n▎ █ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: linux\n▎ █ 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿: Unlimited \n   Ｍｅｎｕ Ｃｏｍｍａｎｄｓ🌀\n   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ \n   *▓  Allmenu - All Menu* 📜\n   *▓  Dmenu - Download Menu* 📥\n   *▓  Omenu - Other Menu* 🛠️\n   *▓  Aimenu - Ai Menu* 🤖\n   *▓  Amenu - Anime Menu* 🌸\n   *▓  Gmenu - Group Menu* 👥\n   *▓  Mmenu - Main Menu* 🏠\n   *▓  Cmenu - Convert Menu* 🔄\n   *▓  Fmenu - Fun Menu* 🎉\n   *▓  Logo <text>* 🖌️\n\n▎ ️ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т Created by ${config.OWNER_NAME} 🪁\n▎ ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т v10 and \n▎ 𝖭Ξ𝖴𝖱Λ𝖫 ΛＩ v1.00             \n⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т\n▎ ▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ \n█▄▄ █▀█ ▀█▀\n█▄█ █▄█ ░█░\n⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            audio: { url: voiceFilePath },
            mimetype: "audio/mp4",
            ptt: true
        }, { quoted: mek });

        // Generate and send menu message

        await conn.sendMessage(from, { image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' }, caption: desc }, { quoted: mek });
, 
        

    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});







// owner menu
cmd({
    pattern: "omenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        let dec = `░ 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂 ░\n\n◦ *owner* 👑  \n   _Example:_ owner [Query]  \n◦ *block* 🚫  \n   _Example:_ block [Query]  \n◦ *unblock* ✔️  \n   _Example:_ unblock [Query]  \n◦ *fullpp* 📸  \n   _Example:_ fullpp [Query]  \n◦ *setpp* 🖼️  \n   _Example:_ setpp [Query]  \n◦ *restart* 🔄  \n   _Example:_ restart [Query]  \n◦ *shutdown* ⏹️  \n   _Example:_ shutdown [Query]  \n◦ *updatecmd* ⬆️  \n   _Example:_ updatecmd [Query]  \n◦ *gjid* 🆔  \n   _Example:_ gjid [Query]  \n◦ *jid* 🆔  \n   _Example:_ jid [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
// convert menu

cmd({
    pattern: "cmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        let dec = `░ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗠𝗲𝗻𝘂 ░\n\n◦ *sticker* 🖼️  \n   _Example:_ sticker [Query]  \n◦ *fancy* ✨  \n   _Example:_ fancy [Query]  \n◦ *take* 📝  \n   _Example:_ take [Query]  \n◦ *tomp3* 🎧  \n   _Example:_ tomp3 [Query]  \n◦ *tts* 🎙️  \n   _Example:_ tts [Query]  \n◦ *trt* 🔄  \n   _Example:_ trt [Query]  \n✦\n░░░ n${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',             newsletterName: 'ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// anmie menu 

cmd({
    pattern: "amenu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
          let dec = `░𝗔𝗻𝗶𝗺𝗲 𝗠𝗲𝗻𝘂░\n\n◦ *dog* 🐶  \n   _Example:_ dog [Query]  \n◦ *awoo* 🐺  \n   _Example:_ awoo [Query]  \n◦ *garl* 🌸  \n   _Example:_ garl [Query]  \n◦ *waifu* 💖  \n   _Example:_ waifu [Query]  \n◦ *neko* 🐱  \n   _Example:_ neko [Query]  \n◦ *maid* 🧹  \n   _Example:_ maid [Query]  \n◦ *animegirl* 👧  \n   _Example:_ animegirl [Query]  \n◦ *animegirl1* 👧  \n   _Example:_ animegirl1 [Query]  \n◦ *animegirl2* 👧  \n   _Example:_ animegirl2 [Query]  \n◦ *animegirl3* 👧  \n   _Example:_ animegirl3 [Query]  \n◦ *animegirl4* 👧  \n   _Example:_ animegirl4 [Query]  \n◦ *animegirl5* 👧  \n   _Example:_ animegirl5 [Query]  \n◦ *anime1* 🌀  \n   _Example:_ anime1 [Query]  \n◦ *anime2* 🌀  \n   _Example:_ anime2 [Query]  \n◦ *anime3* 🌀  \n   _Example:_ anime3 [Query]  \n◦ *anime4* 🌀  \n   _Example:_ anime4 [Query]  \n◦ *anime5* 🌀  \n   _Example:_ anime5 [Query]  \n✦\n░░░ n${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',             newsletterName: 'ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// ai menu 

cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        let dec = `░ 𝗔𝗜 𝗠𝗘𝗡𝗨 ░\n\n◦ *ai* 🤖  \n   _Example:_ ai [Query]  \n◦ *meta* 🌐  \n   _Example:_ meta [Query]  \n◦ *gpt4* 💡  \n   _Example:_ gpt4 [Query]  \n◦ *bing* 🔍  \n   _Example:_ bing [Query]  \n◦ *copilot* 🧭  \n   _Example:_ copilot [Query]  \n✦\n░░░ n${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',             newsletterName: 'ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

