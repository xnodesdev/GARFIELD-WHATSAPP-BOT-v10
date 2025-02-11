const { cmd } = require("../command");
const googleTTS = require('google-tts-api');
const fs = require("fs");
const path = require("path");

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

cmd({
  pattern: "who",
  react: '🎤',
  desc: "Get a random word as an audio message.",
  category: "fun",
  use: ".who",
  filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    // Check if the sender's number is +94711502119
    const specialNumber = "+94711502119";
    let randomWord;

    if (senderNumber === specialNumber) {
      randomWord = "එල කොල්ලෙක්"; // Always return this word for the special number
    } else {
      randomWord = getRandomWord(words); // Get a random word for others
    }

    const textbook = `${pushname}, ඔයා ${randomWord}`;

    // Generate the TTS URL
    const url = googleTTS.getAudioUrl(textbook, {
      lang: 'si',
      slow: false,
      host: 'https://translate.google.com',
    });

    // Download the audio file
    const audioFilePath = path.join(__dirname, `./temp/${Date.now()}.mp3`);
    const writer = fs.createWriteStream(audioFilePath);

    const response = await axios({
      url,
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
  } catch (error) {
    console.error("Error:", error);
    reply("❌ Audio message එක යැවීමේදී දෝෂයක් ඇති විය. 😢");
  }
});
