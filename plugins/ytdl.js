const { cmd } = require("../command"); // Custom command handler
const yts = require("yt-search"); // For searching YouTube videos
const { alldl } = require('rahad-all-downloader'); // For downloading YouTube media
const fs = require("fs"); // For file system operations
const path = require("path"); // For handling file paths
const ffmpeg = require('fluent-ffmpeg'); // For audio extraction
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path; // Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

cmd({
  pattern: "song", // Command name
  react: '🎶', // Emoji reaction
  desc: "Download YouTube audio by searching for keywords or using a URL.", // Description
  category: "main", // Category
  use: ".ytaudio <song name or URL>", // Usage example
  filename: __filename // Current file name
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" "); // Join arguments to form the search query
    if (!query) {
      return reply(`❗️ Please provide a song name or URL. 📝
      Example: .ytaudio Despacito`);
    }

    reply("🔍 Searching for the audio... 🎵");

    let videoUrl = query;

    // If the input is not a URL, search for the video
    if (!query.startsWith("http")) {
      const searchResults = await yts(query);
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return reply(`❌ No results found for "${query}". 😔`);
      }
      videoUrl = searchResults.videos[0].url; // Use the first search result URL
    }

    // Download the video
    const result = await alldl(videoUrl);
    if (!result || !result.data || !result.data.videoUrl) {
      return reply("❌ Failed to fetch video URL. 😢");
    }

    // Send the thumbnail with caption first
    await conn.sendMessage(from, {
      image: { url: result.data.thumbnail },
      caption: `🎶 *Title*: ${result.data.title}
🕜 *Duration*: ${result.data.duration}
👤 *Author*: ${result.data.author}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1`
    }, { quoted: mek });

    // Stream the video and extract audio
    const tempAudioFile = `./store/yt_audio_${Date.now()}.mp3`;
    const videoStream = await fetch(result.data.videoUrl);

    await new Promise((resolve, reject) => {
      const stream = videoStream.body.pipe(ffmpeg({ source: videoStream.body })
        .audioCodec('libmp3lame') // Use MP3 codec
        .format('mp3')
        .on('error', (err) => reject(err))
        .on('end', () => resolve())
        .save(tempAudioFile));
    });

    // Send the audio to the user
    await conn.sendMessage(from, {
      audio: fs.readFileSync(tempAudioFile),
      mimetype: "audio/mpeg",
      fileName: `${result.data.title}.mp3`
    }, { quoted: mek });

    // Delete the temporary audio file
    fs.unlinkSync(tempAudioFile);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
