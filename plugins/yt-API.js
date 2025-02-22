const { cmd } = require("../command");
const { ytmp4 } = require('ruhend-scraper');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

  

    const data = await ytmp4(videoUrl);
    const videoUrlDownload = data.video;
    const fileName = `${title.replace(/[^\w\s]/gi, '')}.mp4`;
    const filePath = path.join('./Downloads', fileName);

    const response = await axios({
      url: videoUrlDownload,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(filePath))
      .on('finish', async () => {
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

      })
      .on('error', (error) => {
        console.error('Error saving video file:', error.message);
        reply("❌ An error occurred while saving the video file. 😢");
      });
  } catch (error) {
    console.error('Error:', error.message);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
