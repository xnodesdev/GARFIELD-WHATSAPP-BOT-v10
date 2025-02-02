const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const fs = require('fs');
const googleTTS = require('google-tts-api');
const { runtime } = require('../lib/functions');
const axios = require('axios');
 
;
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
// other menu

// main menu

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, pushname, reply }) => {
    try {
        // Send voice message from data/Ai.mp3
        const voiceFilePath = 'data/Ai.mp3';
        await conn.sendMessage(from, {
            audio: { url: voiceFilePath },
            mimetype: "audio/mp4",
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});



// anmie menu 


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

