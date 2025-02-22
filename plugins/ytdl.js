const { cmd } = require("../command");
const { ytmp4 } = require('ruhend-scraper');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipe = promisify(pipeline);

// Function to download video with retries
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
  pattern: "video",
  react: '🎥',
  desc: "Download YouTube video by searching for keywords.",
  category: "main",
  use: ".ytvideo <video name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a video name or keywords. 📝\nExample: .ytvideo Despacito`);
    }

    reply("```🔍 Searching for the video... 🎥```");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const { title, url: videoUrl, image, duration, views, author } = searchResults.videos[0];
    const ytmsg = `*🎬 Video Title* - ${title}\n*🕜 Duration* - ${duration}\n*👁️ Views* - ${views}\n*📺 Channel* - ${author.name}\n> File Name: ${title}.mp4\n> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т`;

    // Send video details with thumbna
    const data = await ytmp4(videoUrl);
    const videoUrlDownload = data.video;
    const fileName = `${title.replace(/[^\w\s]/gi, '')}.mp4`;
    const filePath = path.join('./Downloads', fileName);

    // Download the video file with retries
    await downloadWithRetries(videoUrlDownload, filePath);

    console.log(`Video saved to: ${filePath}`);

    // Send the video file
    await conn.sendMessage(from, {
      document: fs.readFileSync(filePath),
      mimetype: "video/mp4",
      filename: `${title}.mp4`,
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
