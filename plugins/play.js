const { cmd } = require("../command");
const { alldl } = require('rahad-all-downloader');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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
    const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${author.name}\n> File Name ${title}.mp3`;

    // Send song details with thumbnail
    const result = await alldl(videoUrl);
    if (!result || !result.data || !result.data.videoUrl) {
      console.error("Full result object:", result);  // Log the full result object for debugging
      return reply("❌ Failed to retrieve video URL. Please try again.");
    }

    const videoDownloadUrl = result.data.videoUrl;
    const videoFilePath = path.join('./downloads', `${title}.mp4`);

    const videoResponse = await fetch(videoDownloadUrl);
    if (!videoResponse.ok) {
      return reply("❌ Failed to download video. Please try again.");
    }

    const videoArrayBuffer = await videoResponse.arrayBuffer();
    const videoBuffer = Buffer.from(videoArrayBuffer);
    fs.writeFileSync(videoFilePath, videoBuffer);


    // Extract audio using direct FFmpeg command
    const audioFilePath = path.join('./downloads', `${title}.mp3`);
    const ffmpegCmd = `ffmpeg -i "${videoFilePath}" -q:a 0 -map a "${audioFilePath}" -y -loglevel error`;

    exec(ffmpegCmd, async (error, stdout, stderr) => {
      if (error) {
       
        return reply("❌ An error occurred while extracting audio. 😢");
      }

      

      // Send the audio file
      await conn.sendMessage(from, {
        document: fs.readFileSync(audioFilePath),
        mimetype: "audio/mpeg",
        caption: ytmsg ,
        fileName: `${title}.mp3`
      }, { quoted: mek });

      

      // Delete temporary files
      fs.unlinkSync(videoFilePath);
      fs.unlinkSync(audioFilePath);
      console.log(`Temporary files deleted: ${videoFilePath}, ${audioFilePath}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
