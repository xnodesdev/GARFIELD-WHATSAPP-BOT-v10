const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video2

cmd({
    pattern: "vid",
    alias: ["video3", "ytvideo", "ytdl"],
    react: "🎥",
    desc: "Download YouTube video with selectable quality",
    category: "main",
    use: '.play4 <Yt url or Name>',
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, q, reply, waitForReply }) => {
    try {
        if (!q) return await reply("Please provide a YouTube URL or Name");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");

        let yts = yt.results[0];

        let ytmsg = `🎥 *𝖵𝖨𝖣𝖤𝖮 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
🎬 *Title* -  ${yts.title}
⏳ *Duration* - ${yts.timestamp}
👁️ *Views* -  ${yts.views}
👤 *Author* -  ${yts.author.name}
🔗 *Link* -  ${yts.url}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т`;

        // Send video details
        await conn.sendMessage(from, { image: { url: yts.thumbnail || yts.image || '' }, caption: `${ytmsg}` }, { quoted: mek });

        let quality = "360p"; // Directly set quality to 360p
        const ytdl = await ytmp4(yts.url, quality);
        if (!ytdl.download.url) return reply("Failed to get the download link!");

        // Send video file
        await conn.sendMessage(from, {
            video: { url: ytdl.download.url },
            mimetype: "video/mp4",
            caption: `> *${yts.title}*\n> *Quality: ${quality}*\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(e.message || "An error occurred!");
    }
});

// play2

cmd({
    pattern: "song",
    alias: ["audio3","ytdl2","ytsong2"],
    react: "🎶",
    desc: "Download Youtube song",
    category: "main",
    use: '.song < Yt url or Name >',
    filename: __filename
},
async(conn, mek, m,{ from, prefix, quoted, q, reply }) => {
try{

if(!q) return await reply("Please give me Yt url or Name")
	
const yt = await ytsearch(q); 
if(yt.results.length < 1) return reply("Results is not found !")

let yts = yt.results[0]  
const ytdl = await ytmp3(yts.url, { quality: 'highestaudio' });
		
let ytmsg = `
🎵 *𝖬𝖴𝖲𝖨𝖢 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
🎬 *Title* - ${yts.title}
⏳ *Duration* - ${yts.timestamp}
👁️ *Views* - ${yts.views}
👤 *Author* - ${yts.author.name}
🔗 *Link* - ${yts.url}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т`
// SEND DETAILS
await conn.sendMessage(from, { image: { url: yts.thumbnail || yts.image || '' }, caption: `${ytmsg}`}, { quoted: mek });

// SEND AUDIO TYPE
await conn.sendMessage(from, { audio: { url: ytdl.download.url }, mimetype: "audio/mpeg" }, { quoted: mek })

// SEND DOC TYPE
await conn.sendMessage(from, { document: { url: ytdl.download.url }, mimetype: "audio/mpeg", fileName: ytdl.result.title + '.mp3', caption: `> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т` }, { quoted: mek })


} catch (e) {
console.log(e)
reply(e)
}}
)
