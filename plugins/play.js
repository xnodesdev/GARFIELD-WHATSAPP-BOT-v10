const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "play4",
    alias: ["ytmp3","audio3"],
    desc: "download songs",
    category: "download",
    react: "🎵",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please provide a link or a name 🔎...*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let desc = `╭━━━〔 *𝐒𝐇𝐀𝐁𝐀𝐍-𝐒𝐎𝐁𝐗-𝐌𝐃* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *𝐌𝐔𝐒𝐈𝐂 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*
┃▸└───────────···๏
╰────────────────┈⊷
╭━❮ *Download Audio* ❯━┈⊷
┃▸╭─────────────·๏
┃▸┃๏ *Tital* - ${data.title}
┃▸┃๏ *Views* - ${data.views}
┃▸┃๏ *Description* - ${data.description}
┃▸┃๏ *Duration:* ${data.timestamp}}
┃▸┃๏ *Link* - ${data.url}
┃▸┃๏ *Ago* - ${data.ago}
┃▸└────────────┈⊷
╰━━━━━━━━━━━━━━━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)  
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio:{url: downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"audio/mpeg",fileName:data.title + "mp3",caption:"©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Sʜᴀʙᴀɴ"},{quoted:mek})
}catch(e){
reply(`${e}`)
}
})

//===========darama-dl===========

cmd({
    pattern: "darama",
    alias: ["video4","ytmp4"],    
    desc: "download video",
    category: "download",
    react: "🎥",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please provide a link or a name 🔎...*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let des = `╭━━━〔 *𝐒𝐇𝐀𝐁𝐀𝐍-𝐒𝐎𝐁𝐗-𝐌𝐃* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*
┃▸└───────────···๏
╰────────────────┈⊷
╭━❮ *Download Audio* ❯━┈⊷
┃▸╭─────────────·๏
┃▸┃๏ *Tital* - ${data.title}
┃▸┃๏ *Views* - ${data.views}
┃▸┃๏ *Description* - ${data.description}
┃▸┃๏ *Duration:* ${data.timestamp}}
┃▸┃๏ *Link* - ${data.url}
┃▸┃๏ *Ago* - ${data.ago}
┃▸└────────────┈⊷
╰━━━━━━━━━━━━━━━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:des},{quoted:mek});

//download video

let down = await fg.ytv(url)  
let downloadUrl = down.dl_url

//send video
await conn.sendMessage(from,{video:{url: downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"video/mp4",fileName:data.title + "mp4",caption:"©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Sʜᴀʙᴀɴ"},{quoted:mek})
    
}catch(a){
reply(`${a}`)
}
})
