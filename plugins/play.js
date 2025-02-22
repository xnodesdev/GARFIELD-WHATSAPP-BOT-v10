const { cmd } = require("../command");
const { ytmp3 } = require('ruhend-scraper');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipe = promisify(pipeline);

cmd({
  pattern: "play",
  react: '🎶',
  desc: "Download YouTube audio by searching for keywords.",
  category: "main",
  use: ".ytaudio <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a song name or keywords. 📝\nExample: .ytaudio Despacito`);
    }

    reply("```🔍 Searching for the song... 🎵```");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const { title, duration, views, author, url: videoUrl, image } = searchResults.videos[0];
    const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${author.name}\n> File Name: ${title}.mp3`;

    // Send song details with thumbnail
    const data = await ytmp3(videoUrl);
    const audioUrl = data.audio;
    const fileName = `${title.replace(/[^\w\s]/gi, '')}.mp3`;
    const filePath = path.join('./Downloads', fileName);

    const response = await axios({
      url: audioUrl,
      method: 'GET',
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' } // Add User-Agent header to avoid 403 error
    });

    await pipe(response.data, fs.createWriteStream(filePath));

    // Send the audio file
    await conn.sendMessage(from, {
      document: fs.readFileSync(filePath),
      mimetype: "audio/mpeg",
      filename: title,
      caption: ytmsg
    }, { quoted: mek });

    // Delete the temporary file
    fs.unlinkSync(filePath);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response && error.response.status === 403) {
      reply("❌ Access to the media URL was denied (403 Forbidden). Please check if the media URL is valid and accessible. 😢");
    } else {
      reply("❌ An error occurred while processing your request. 😢");
    }
  }
});
