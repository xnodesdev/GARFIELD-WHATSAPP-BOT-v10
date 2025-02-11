const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const googleTTS = require('google-tts-api');
const fs = require('fs');
const path = require('path');

// Ensure the temp directory exists
if (!fs.existsSync('./temp')){
    fs.mkdirSync('./temp');
}

// Array of words
const words = [
  "අසහන කාරයෙක්",
  "පිස්සෙක්",
  "මෝඩ හරකෙක්",
  "ගොබ්බයෙක්",
  "එල කොල්ලෙක්",
  "හොරෙක්",
  "රිලවෙක්",
  "උරුලෑවෙක්",
  "වැද්දෙක්",
  "නළුවෙක්",
  "ගොං හිපාටුවෙක්",
  "පිස්සු යකෙක්",
  "හොඳ ළමයෙක්",
  "හිපාටුවෙක්",
  "පොල් ගොබ්බයෙක්",
  "ගෑණු පෙරේතයෙක්",
  "සමලිංගිකයෙක්",
  "මැරයෙක්",
  "ලිංගික බෙලහීනතාවයෙන් පෙලෙන්නෙක්",
  "බේබද්දෙක්",
  "යට ඇඳුම් හොරෙක්",
  "පිටසක්වල ජීවියෙක්"
];

// Function to get a random word from the array
function getRandomWord(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Command for translation
cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "සිංහල Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `> *GARFIELD-BOT-v10-TRANSLATION*

> 🔤 *Original*: ${textToTranslate}

> 🔠 *Translated*: ${translation}

> 🌐 *Language*: ${targetLang.toUpperCase()}`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating the text. Please try again later 🤕");
    }
});

// Command for TTS
cmd({
    pattern: "tts",
    desc: "Convert text to speech",
    category: "fun",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Need some text.");

        const url = googleTTS.getAudioUrl(q, {
            lang: 'si',
            slow: false,
            host: 'https://translate.google.com',
        });

        await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error);
        reply("❌ Audio message එක යැවීමේදී දෝෂයක් ඇති විය. 😢");
    }
});

// Command for random word TTS
cmd({
    pattern: "me",
    react: '🎤',
    desc: "Get a random word as an audio message.",
    category: "fun",
    filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    // Check if the sender's number is +94711502119
    const specialNumber = "+94711502119";
    let randomWord;

    if (senderNumber === specialNumber) {
      randomWord = "ගොඩක් හොඳ ළමයෙක්"; // Always return this word for the special number
    } else {
      randomWord = getRandomWord(words); // Get a random word for others
    }

    const textbook = `${pushname}, ඔයා ${randomWord}`;

    // Generate the TTS URL
    const ttsUrl = googleTTS.getAudioUrl(textbook, {
        lang: 'si',
        slow: false,
        host: 'https://translate.google.com'
    });

    // Download the audio file
    const audioFilePath = path.join(__dirname, `./temp/${Date.now()}.mp3`);
    const writer = fs.createWriteStream(audioFilePath);

    const response = await axios({
      url: ttsUrl,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(writer);

    writer.on('finish', async () => {
      // Send the audio file
      await conn.sendMessage(from, {
        audio: fs.readFileSync(audioFilePath),
        mimetype: "audio/mpeg",
      }, { quoted: mek });

      // Delete the temporary file
      fs.unlinkSync(audioFilePath);
    });

    writer.on('error', (error) => {
      console.error("Error during file write:", error);
      reply("❌ Audio message එක යැවීමේදී දෝෂයක් ඇති විය. 😢");
    });
  } catch (error) {
    console.error("Error:", error);
    reply("❌ Audio message එක යැවීමේදී දෝෂයක් ඇති විය. 😢");
  }
});
