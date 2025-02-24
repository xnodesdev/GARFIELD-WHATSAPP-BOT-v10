const { cmd } = require("../command");
const { ytmp3 } = require('ruhend-scraper');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipe = promisify(pipeline);

// Function to download audio with retries
async function downloadWithRetries(url, filePath, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                    'Referer': 'https://www.youtube.com',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                }
            });
            await pipe(response.data, fs.createWriteStream(filePath));
            return;
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            console.log(`Retry attempt ${attempt} failed. Retrying...`);
        }
    }
}

cmd({
  pattern: "ddd",
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
    await conn.sendMessage(from, { image: { url: image }, caption: ytmsg });

    const data = await ytmp3(videoUrl);
    const audioUrl = data.audio;
    const fileName = `${title.replace(/[^\w\s]/gi, '')}.mp3`;
    const filePath = path.join('./Downloads', fileName);

    // Download the audio file with retries
    await downloadWithRetries(audioUrl, filePath);

    // Send the audio file
    await conn.sendMessage(from, {
      audio: fs.readFileSync(filePath),
      mimetype: "audio/mpeg",
      filename: fileName
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
