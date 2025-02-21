const { cmd } = require("../command");
const { alldl } = require('rahad-all-downloader');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

cmd({
  pattern: "ytaudio",
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

    reply("🔍 Searching for the song... 🎵");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const videoUrl = searchResults.videos[0].url;
    const Filename = searchResults.videos[0].title.replace(/[^a-zA-Z0-9]/g, '_');

    const result = await alldl(videoUrl);
    if (!result || !result.data || !result.data.videoUrl) {
      console.error("Full result object:", result);  // Log the full result object for debugging
      return reply("❌ Failed to retrieve video URL. Please try again.");
    }

    const videoDownloadUrl = result.data.videoUrl;
    const videoFilePath = path.join('./downloads', `${Filename}.mp4`);

    const videoResponse = await fetch(videoDownloadUrl);
    if (!videoResponse.ok) {
      console.error("Failed to download video:", videoResponse.statusText);
      return reply("❌ Failed to download video. Please try again.");
    }

    const videoArrayBuffer = await videoResponse.arrayBuffer();
    const videoBuffer = Buffer.from(videoArrayBuffer);
    fs.writeFileSync(videoFilePath, videoBuffer);

    console.log(`Video downloaded successfully: ${videoFilePath}`);

    // Extract audio using direct FFmpeg command
    const audioFilePath = path.join('./downloads', `${Filename}.mp3`);
    const ffmpegCmd = `ffmpeg -i "${videoFilePath}" -q:a 0 -map a "${audioFilePath}" -y -loglevel error`;

    exec(ffmpegCmd, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error extracting audio:', stderr);
        return reply("❌ An error occurred while extracting audio. 😢");
      }

      console.log(`Audio extracted successfully: ${audioFilePath}`);

      await conn.sendMessage(from, {
        audio: fs.readFileSync(audioFilePath),
        mimetype: "audio/mpeg",
        fileName: `${Filename}.mp3`
      }, { quoted: mek });

      console.log(`Audio sent successfully: ${audioFilePath}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
