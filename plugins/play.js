const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "audio",
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

let desc = `
🎥 *MUSIC 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
🎬 *Title* -  ${yts.title}
⏳ *Duration* - ${yts.timestamp}
👁️ *Views* -  ${yts.views}
👤 *Author* -  ${yts.author.name}
🔗 *Link* -  ${yts.url}`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)  
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio:{url: downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"audio/mpeg",fileName:data.title + "mp3",caption:"ＧＡＲＦＩＥＬＤ ＢＯＴ ｖ10 🧬"},{quoted:mek})
}catch(e){
reply(`${e}`)
}
})

//===========darama-dl===========

cmd({
    pattern: "yt",
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

let des = `🎥 *𝖵𝖨𝖣𝖤𝖮 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
🎬 *Title* -  ${yts.title}
⏳ *Duration* - ${yts.timestamp}
👁️ *Views* -  ${yts.views}
👤 *Author* -  ${yts.author.name}
🔗 *Link* -  ${yts.url}`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:des},{quoted:mek});

//download video

let down = await fg.ytv(url)  
let downloadUrl = down.dl_url

//send video
await conn.sendMessage(from,{video:{url: downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"video/mp4",fileName:data.title + "mp4",caption:"ＧＡＲＦＩＥＬＤ ＢＯＴ ｖ10 🧬"},{quoted:mek})
    
}catch(a){
reply(`${a}`)
}
})
