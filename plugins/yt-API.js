const { cmd } = require("../command");
const { alldl } = require('rahad-all-downloader');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "video",
  react: '🎥',
  desc: "Download YouTube video by searching for keywords.",
  category: "main",
  use: ".video <video name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a video name or keywords. 📝\nExample: .video Despacito`);
    }

    reply("```🔍 Searching for the video... 🎥```");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const { title, duration, views, author, url: videoUrl, image } = searchResults.videos[0];
    const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}`;

    // Send video details with thumbnail

    const result = await alldl(videoUrl);
    if (!result || !result.data || !result.data.videoUrl) {
      console.error("Full result object:", result);  // Log the full result object for debugging
      return reply("❌ Failed to retrieve video URL. Please try again.");
    }

    const videoDownloadUrl = result.data.videoUrl;
    const videoFilePath = path.join('./downloads', `${title}.mp4`);

    const videoResponse = await fetch(videoDownloadUrl);
    if (!videoResponse.ok) {
      console.error("Failed to download video:", videoResponse.statusText);
      return reply("❌ Failed to download video. Please try again.");
    }

    const videoArrayBuffer = await videoResponse.arrayBuffer();
    const videoBuffer = Buffer.from(videoArrayBuffer);
    fs.writeFileSync(videoFilePath, videoBuffer);

   
    // Send the video file
    await conn.sendMessage(from, {
      document: fs.readFileSync(videoFilePath),
      mimetype: "video/mp4",
      caption: ytmsg,
      filename:`${title}.mp4`
    }, { quoted: mek });

    // Delete the temporary file
    fs.unlinkSync(videoFilePath);
    console.log(`Temporary file deleted: ${videoFilePath}`);
  } catch (error) {
    console.error('Error:', error.message);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
