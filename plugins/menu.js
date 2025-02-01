const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const fs = require('fs');
const { runtime } = require('../lib/functions');
const axios = require('axios');
 
cmd({
    pattern: "menu2",
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *${config.OWNER_NAME}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Platform : *Heroku*
┃★│ Mode : *[${config.MODE}]*
┃★│ Prifix : *[${config.PREFIX}]*
┃★│ Version : *V.5 Bᴇᴛᴀ*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• surahmenu
┃◈┃• prayertime
┃◈┃• aimenu
┃◈┃• anmiemenu
┃◈┃• convertmenu
┃◈┃• funmenu
┃◈┃• dlmenu
┃◈┃• listcmd
┃◈┃• mainmenu
┃◈┃• groupmenu
┃◈┃• allmenu
┃◈┃• ownermenu
┃◈┃• othermenu
┃◈┃• logo <text>
┃◈┃• repo
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}


▬
▎ Hi 👋 
▎ ${config.BOT_NAME}
▎ █ 𝗦𝗽𝗲𝗲𝗱 : 0.00119 miliseconds
▎ █ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : 24 × 7 Hours 
▎ █ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${config.BOT_NAME} 
▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 : ${config.OWNER_NAME}
▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿 : ${config.OWNER_NUM}
▎ █ 𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲 : ${config.OWNER_NAME}
▎ █ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : linux
▎ █ 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿 : 11
   Ｍｅｎｕ Ｃｏｍｍａｎｄｓ🌀
   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ 
   *▓  AllMenu* 
   *▓  DMenu*
   *▓  Searchmenu*
   *▓  mainimenu*
   *▓  Convertmenu*
   *▓  Funmenu*
   *▓  Databasemenu*
   *▓  Gamemenu*

▎ ️ＧＡＲＦＩＥＬＤ ＢＯＴ  Created by ${config.OWNER_NAME} 🪁
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




`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363376871871901@newsletter',
                        newsletterName: '© ᴄᴏᴅᴇᴅ ʙʏ ᴛʜᴀʀɪɴᴅᴜ ʟɪʏᴀɴᴀɢᴇ',
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
        const menu = `░░░ *ＤＯＷＮＬＯＡＤ ＭＥＮＵ* ░░░

◦ *Facebook* 📘  
   _Example:_ facebook [Query]  
◦ *fb* 🌐  
   _Example:_ fb [Query]  
◦ *Mediafire* 📂  
   _Example:_ mediafire [Query]  
◦ *TikTok* 🎵  
   _Example:_ tiktok [Query]  
◦ *tt* 📲  
   _Example:_ tt [Query]  
◦ *Twitter* 🐦  
   _Example:_ twitter [Query]  
◦ *Instagram* 📸  
   _Example:_ insta [Query]  
◦ *Insta* 🌟  
   _Example:_ insta [Query]  
◦ *APK* 📱  
   _Example:_ apk [Query]  
◦ *Images* 🖼️  
   _Example:_ img [Query]  
◦ *img* 🌠  
   _Example:_ img [Query]  
◦ *song* 🎧  
   _Example:_ spotify [Query]  
◦ *Spotify* 🎧  
   _Example:_ spotify [Query]  
◦ *vid* 🎬  
   _Example:_ video [Query]  
◦ *Play* 🎮  
   _Example:_ play [Query]  
◦ *play2* ⚡  
   _Example:_ play2 [Query]  
◦ *play5* 🚀  
   _Example:_ play5 [Query]  
◦ *Video* 🎥  
   _Example:_ video [Query]  
◦ *video2* 🎬  
   _Example:_ video2 [Query]  
◦ *Drama* 🎭  
   _Example:_ drama [Query]  
◦ *YouTube MP3* 🎶  
   _Example:_ ytmp3 [Query]  
◦ *ytmp3* 🎧  
◦ *YouTube MP4* 📺  
   _Example:_ ytmp4 [Query]  
◦ *ytmp4* 📼  
◦ *Git* 💻  
   _Example:_ git [Query]  
◦ *Google Drive* 📂  
   _Example:_ gdrive [Query]  
◦ *gdrive* 📁  
   _Example:_ gdrive [Query]  
✦
░░░ ${config.BOT_NAME} ░░░
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢᴀʀꜰɪᴇʟᴅ ʙᴏᴛ`;
 await conn.sendMessage(from, { 
      image: { url: `${config.ALIVE_IMG}` },
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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try
       {
        let dec = `░░░ *𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨* ░░░

◦ *grouplink* 🔗  
   _Example:_ grouplink [Query]  
◦ *kickall* 🚫  
   _Example:_ kickall [Query]  
◦ *kickall2* 🚫  
   _Example:_ kickall2 [Query]  
◦ *kickall3* 🚫  
   _Example:_ kickall3 [Query]  
◦ *add* ➕  
   _Example:_ add [Query]  
◦ *remove* ➖  
   _Example:_ remove [Query]  
◦ *kick* 👢  
   _Example:_ kick [Query]  
◦ *promote* ⬆️  
   _Example:_ promote [Query]  
◦ *demote* ⬇️  
   _Example:_ demote [Query]  
◦ *dismiss* 🚪  
   _Example:_ dismiss [Query]  
◦ *revoke* ⛔  
   _Example:_ revoke [Query]  
◦ *setgoodbye* 👋  
   _Example:_ setgoodbye [Query]  
◦ *setwelcome* 🎉  
   _Example:_ setwelcome [Query]  
◦ *delete* 🗑️  
   _Example:_ delete [Query]  
◦ *getpic* 📸  
   _Example:_ getpic [Query]  
◦ *ginfo* ℹ️  
   _Example:_ ginfo [Query]  
◦ *disappear on* 🌟  
   _Example:_ disappear on [Query]  
◦ *disappear off* 💨  
   _Example:_ disappear off [Query]  
◦ *disappear 7D,24H* ⏰  
   _Example:_ disappear 7D,24H [Query]  
◦ *allreq* 🌐  
   _Example:_ allreq [Query]  
◦ *updategname* 📝  
   _Example:_ updategname [Query]  
◦ *updategdesc* 📄  
   _Example:_ updategdesc [Query]  
◦ *joinrequests* 📩  
   _Example:_ joinrequests [Query]  
◦ *senddm* ✉️  
   _Example:_ senddm [Query]  
◦ *nikal* 🚪  
   _Example:_ nikal [Query]  
◦ *mute* 🔇  
   _Example:_ mute [Query]  
◦ *unmute* 🔊  
   _Example:_ unmute [Query]  
◦ *lockgc* 🔒  
   _Example:_ lockgc [Query]  
◦ *unlockgc* 🔓  
   _Example:_ unlockgc [Query]  
◦ *invite* ✉️  
   _Example:_ invite [Query]  
◦ *tag* 🏷️  
   _Example:_ tag [Query]  
◦ *hidetag* 👀  
   _Example:_ hidetag [Query]  
◦ *tagall* 📢  
   _Example:_ tagall [Query]  
◦ *tagadmins* 🛡️  
   _Example:_ tagadmins [Query]  
✦
░░░ n${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        let dec = `░░░ 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 ░░░

◦ *insult* 🗣️  
   _Example:_ insult [Query]  
◦ *pickup* 💬  
   _Example:_ pickup [Query]  
◦ *ship* 🚢  
   _Example:_ ship [Query]  
◦ *character* 🎭  
   _Example:_ character [Query]  
◦ *hack* 💻  
   _Example:_ hack [Query]  
◦ *joke* 😂  
   _Example:_ joke [Query]  
◦ *hrt* 💔  
   _Example:_ hrt [Query]  
◦ *hpy* 😊  
   _Example:_ hpy [Query]  
◦ *syd* 😢  
   _Example:_ syd [Query]  
◦ *anger* 😡  
   _Example:_ anger [Query]  
◦ *shy* 😳  
   _Example:_ shy [Query]  
◦ *kiss* 💋  
   _Example:_ kiss [Query]  
◦ *mon* 👾  
   _Example:_ mon [Query]  
◦ *cunfuzed* 😕  
   _Example:_ cunfuzed [Query]  
◦ *setpp* 📸  
   _Example:_ setpp [Query]  
◦ *hand* 🤚  
   _Example:_ hand [Query]  
◦ *nikal* 🚪  
   _Example:_ nikal [Query]  
◦ *hold* ✋  
   _Example:_ hold [Query]  
◦ *hug* 🤗  
   _Example:_ hug [Query]  
◦ *hifi* ✋  
   _Example:_ hifi [Query]  
◦ *poke* 👉  
   _Example:_ poke [Query]  
✦
░░░ ${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `░░ ⬤ 𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂 ⬤ ░░

◦ *vv* 🎥  
   _Example:_ vv [Query]  
◦ *pair* 💑  
   _Example:_ pair [Query]  
◦ *pair2* 💏  
   _Example:_ pair2 [Query]  
◦ *fact* 📜  
   _Example:_ fact [Query]  
◦ *fancy* ✨  
   _Example:_ fancy [Query]  
◦ *define* 📖  
   _Example:_ define [Query]  
◦ *news* 📰  
   _Example:_ news [Query]  
◦ *movie* 🎬  
   _Example:_ movie [Query]  
◦ *weather* 🌤️  
   _Example:_ weather [Query]  
◦ *srepo* 📑  
   _Example:_ srepo [Query]  
◦ *insult* 🗣️  
   _Example:_ insult [Query]  
◦ *save* 💾  
   _Example:_ save [Query]  
◦ *wikipedia* 🌐  
   _Example:_ wikipedia [Query]  
◦ *gpass* 🔑  
   _Example:_ gpass [Query]  
◦ *githubstalk* 🕵️  
   _Example:_ githubstalk [Query]  
◦ *yts link* 📎  
   _Example:_ yts link [Query]  
✦
░░░ ${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
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
const googleTTS = require('google-tts-api');

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate TTS voice message
        const ttsText = `Hi ${pushname} This is Garfield whatsapp bot project by Tharidhu Liyana gay`;
        const ttsUrl = googleTTS.getAudioUrl(ttsText, {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
        });

        // Download the TTS audio
        const response = await axios.get(ttsUrl, { responseType: 'arraybuffer' });
        const ttsBuffer = Buffer.from(response.data, 'binary');
        const ttsFilePath = 'tts.mp3';
        fs.writeFileSync(ttsFilePath, ttsBuffer);

        // Send TTS voice message
        await conn.sendMessage(from, {
            audio: { url: ttsFilePath },
            mimetype: "audio/mp4",
            ptt: true
        }, { quoted: mek });

        // Generate and send menu message
        const menu = `▬
▎ Hi ${pushname} 👋 
▎ ${config.BOT_NAME}
▎ █ 𝗦𝗽𝗲𝗲𝗱: 0.00119 milliseconds
▎ █ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: 24 Hours × 7
▎ █ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${config.BOT_NAME} 
▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}
▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿: ${config.OWNER_NUMBER}
▎ █ 𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}
▎ █ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: linux
▎ █ 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿: Unlimited 
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

▎ ️ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т Created by ${config.OWNER_NAME} 🪁
▎ ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т v10 and 
▎ 𝖭Ξ𝖴𝖱Λ𝖫 ΛＩ v1.00             
⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁
▎ ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т
▎ ▁▁▁▁▁▁▁▁▁▁▁▁▁▁
▎ 
█▄▄ █▀█ ▀█▀
█▄█ █▄█ ░█░
⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: `${config.ALIVE_IMG}` },
            caption: menu
        }, { quoted: mek });

        // Clean up the temporary TTS file
        fs.unlinkSync(ttsFilePath);

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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `░ 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂 ░

◦ *owner* 👑  
   _Example:_ owner [Query]  
◦ *block* 🚫  
   _Example:_ block [Query]  
◦ *unblock* ✔️  
   _Example:_ unblock [Query]  
◦ *fullpp* 📸  
   _Example:_ fullpp [Query]  
◦ *setpp* 🖼️  
   _Example:_ setpp [Query]  
◦ *restart* 🔄  
   _Example:_ restart [Query]  
◦ *shutdown* ⏹️  
   _Example:_ shutdown [Query]  
◦ *updatecmd* ⬆️  
   _Example:_ updatecmd [Query]  
◦ *gjid* 🆔  
   _Example:_ gjid [Query]  
◦ *jid* 🆔  
   _Example:_ jid [Query]  
✦
░░░ ${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: `${config.ALIVE_IMG}` },
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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `░ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗠𝗲𝗻𝘂 ░

◦ *sticker* 🖼️  
   _Example:_ sticker [Query]  
◦ *fancy* ✨  
   _Example:_ fancy [Query]  
◦ *take* 📝  
   _Example:_ take [Query]  
◦ *tomp3* 🎧  
   _Example:_ tomp3 [Query]  
◦ *tts* 🎙️  
   _Example:_ tts [Query]  
◦ *trt* 🔄  
   _Example:_ trt [Query]  
✦
░░░ n${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
          let dec = `░𝗔𝗻𝗶𝗺𝗲 𝗠𝗲𝗻𝘂░

◦ *dog* 🐶  
   _Example:_ dog [Query]  
◦ *awoo* 🐺  
   _Example:_ awoo [Query]  
◦ *garl* 🌸  
   _Example:_ garl [Query]  
◦ *waifu* 💖  
   _Example:_ waifu [Query]  
◦ *neko* 🐱  
   _Example:_ neko [Query]  
◦ *maid* 🧹  
   _Example:_ maid [Query]  
◦ *animegirl* 👧  
   _Example:_ animegirl [Query]  
◦ *animegirl1* 👧  
   _Example:_ animegirl1 [Query]  
◦ *animegirl2* 👧  
   _Example:_ animegirl2 [Query]  
◦ *animegirl3* 👧  
   _Example:_ animegirl3 [Query]  
◦ *animegirl4* 👧  
   _Example:_ animegirl4 [Query]  
◦ *animegirl5* 👧  
   _Example:_ animegirl5 [Query]  
◦ *anime1* 🌀  
   _Example:_ anime1 [Query]  
◦ *anime2* 🌀  
   _Example:_ anime2 [Query]  
◦ *anime3* 🌀  
   _Example:_ anime3 [Query]  
◦ *anime4* 🌀  
   _Example:_ anime4 [Query]  
◦ *anime5* 🌀  
   _Example:_ anime5 [Query]  
✦
░░░ n${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `░ 𝗔𝗜 𝗠𝗘𝗡𝗨 ░

◦ *ai* 🤖  
   _Example:_ ai [Query]  
◦ *meta* 🌐  
   _Example:_ meta [Query]  
◦ *gpt4* 💡  
   _Example:_ gpt4 [Query]  
◦ *bing* 🔍  
   _Example:_ bing [Query]  
◦ *copilot* 🧭  
   _Example:_ copilot [Query]  
✦
░░░ n${config.BOT_NAME} ░░░
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `${config.ALIVE_IMG}` },
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

