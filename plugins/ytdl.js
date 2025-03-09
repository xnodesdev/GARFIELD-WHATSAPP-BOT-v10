const { cmd } = require("../command");
const yts = require("yt-search");
const { getVideoInfo, downloadAudio, downloadVideo } = require("hybrid-ytdl");
const fs = require("fs");
const { promisify } = require("util");
const fetch = require("node-fetch");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Helper function to download files from URLs with timeout
const downloadFile = async (url, filePath) => {
  try {
    const response = await fetch(url, { timeout: 30000 }); // 30s timeout
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const buffer = await response.buffer();
    await writeFile(filePath, buffer);
  } catch (error) {
    throw new Error(`Download failed: ${error.message}`);
  }
};

// Helper function to handle errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  reply(`${errorMsg}: ${e.message}`);
};

// Download YouTube audio
cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Search and download YouTube audio using hybrid-ytdl.",
    category: "main",
    use: ".song <song name>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a song name. 📝\nExample: .song Despacito`
        );
      }

      reply("```🔍 Searching for the song... 🎵```");

      // Search for the video using yt-search
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const videoUrl = searchResults.videos[0].url;

      // Get video info using hybrid-ytdl
      let info;
      try {
        info = await getVideoInfo(videoUrl);
      } catch (e) {
        return reply(`❌ Failed to fetch video info: ${e.message}. Try again later. 😔`);
      }
      if (!info || !info.status) {
        return reply(`❌ Invalid video info for "${searchQuery}". 😔`);
      }

      const { title, duration, views, creator, thumbnail } = info;
      const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}s\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${creator || "Unknown"}\n> File Name ${title}.mp3`;

      // Send song details with thumbnail
      await conn.sendMessage(from, { image: { url: thumbnail }, caption: ytmsg });

      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      // Download audio with hybrid-ytdl (320kbps, API 2 with fallback)
      let audioData;
      try {
        audioData = await downloadAudio(videoUrl, "320", "api2");
        if (!audioData.status) {
          // Fallback to default API if API 2 fails
          audioData = await downloadAudio(videoUrl, "320");
        }
      } catch (e) {
        return reply(`❌ Audio fetch failed: ${e.message}. Try again later. 😢`);
      }

      if (!audioData || !audioData.downloadUrl) {
        return reply("❌ No valid audio download URL received. 😢");
      }

      // Download the file
      await downloadFile(audioData.downloadUrl, tempFileName);

      // Send audio
      await conn.sendMessage(
        from,
        {
          audio: await readFile(tempFileName),
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
        },
        { quoted: mek }
      );

      // Clean up temporary file
      await unlink(tempFileName);
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your audio request")(e);
    }
  }
);

// Download YouTube video
cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Search and download YouTube video using hybrid-ytdl.",
    category: "main",
    use: ".video <video name>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a video name. 📝\nExample: .video Despacito`
        );
      }

      reply("```🔍 Searching for the video... 🎥```");

      // Search for the video using yt-search
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const videoUrl = searchResults.videos[0].url;

      // Get video info using hybrid-ytdl
      let info;
      try {
        info = await getVideoInfo(videoUrl);
      } catch (e) {
        return reply(`❌ Failed to fetch video info: ${e.message}. Try again later. 😔`);
      }
      if (!info || !info.status) {
        return reply(`❌ Invalid video info for "${searchQuery}". 😔`);
      }

      const { title, duration, views, creator, thumbnail } = info;
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}s\n👁️ *Views* - ${views}\n👤 *Author* - ${creator || "Unknown"}\n🔗 *Link* - ${videoUrl}`;

      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

      // Download video with hybrid-ytdl (1080p, API 2 with fallback)
      let videoData;
      try {
        videoData = await downloadVideo(videoUrl, "1080", "api2");
        if (!videoData.status) {
          // Fallback to default API if API 2 fails
          videoData = await downloadVideo(videoUrl, "1080");
        }
      } catch (e) {
        return reply(`❌ Video fetch failed: ${e.message}. Try again later. 😢`);
      }

      if (!videoData || !videoData.downloadUrl) {
        return reply("❌ No valid video download URL received. 😢");
      }

      // Download the file
      await downloadFile(videoData.downloadUrl, tempFileName);

      // Send video
      await conn.sendMessage(
        from,
        {
          document: await readFile(tempFileName),
          mimetype: "video/mp4",
          caption: ytmsg,
        },
        { quoted: mek }
      );

      // Clean up temporary file
      await unlink(tempFileName);
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your video request")(e);
    }
  }
);
