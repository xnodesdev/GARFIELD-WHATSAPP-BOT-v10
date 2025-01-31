const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "audio",
    alias: ["ytmp3", "audio3"],
    desc: "Download songs",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*Please provide a link or a name 🔎...*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎥 *MUSIC DOWNLOADER*
🎬 *Title* -  ${data.title}
⏳ *Duration* - ${data.timestamp}
👁️ *Views* -  ${data.views}
👤 *Author* -  ${data.author.name}
🔗 *Link* -  ${data.url}`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send audio
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "ＧＡＲＦＩＥＬＤ ＢＯＴ ｖ10 🧬" }, { quoted: mek });
    } catch (e) {
        console.error("Error in audio command:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "yt",
    alias: ["video4", "ytmp4"],
    desc: "Download video",
    category: "download",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*Please provide a link or a name 🔎...*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let des = `
🎥 *VIDEO DOWNLOADER*
🎬 *Title* -  ${data.title}
⏳ *Duration* - ${data.timestamp}
👁️ *Views* -  ${data.views}
👤 *Author* -  ${data.author.name}
🔗 *Link* -  ${data.url}`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: des }, { quoted: mek });

        // Download video
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        // Send video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "ＧＡＲＦＩＥＬＤ ＢＯＴ ｖ10 🧬" }, { quoted: mek });
    } catch (a) {
        console.error("Error in yt command:", a);
        reply(`❌ An error occurred: ${a.message}`);
    }
});