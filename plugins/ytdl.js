const { cmd } = require("../command");
const { getVideoInfo, downloadAudio, downloadVideo } = require("hybrid-ytdl");
const fs = require("fs");
const { promisify } = require("util");
const fetch = require("node-fetch");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Helper function to download files from URLs
const downloadFile = async (url, filePath) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  await writeFile(filePath, buffer);
};

// Helper function to handle errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  reply(errorMsg);
};

// Download YouTube audio
cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Quickly download YouTube audio with hybrid-ytdl.",
    category: "main",
    use: ".song <song name or URL>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a song name or URL. 📝\nExample: .song Despacito`
        );
      }

      reply("```🔍 Searching for the song... 🎵```");

      // Get video info
      const info = await getVideoInfo(searchQuery);
      if (!info.status) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, creator, thumbnail, url: videoUrl } = info;
      const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}s\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${creator}\n> File Name ${title}.mp3`;

      // Send song details with thumbnail
      await conn.sendMessage(from, { image: { url: thumbnail }, caption: ytmsg });

      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      // Download audio with highest bitrate
      const audioData = await downloadAudio(videoUrl, "320");
      if (!audioData.status) {
        return reply("❌ Failed to fetch audio download URL. 😢");
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
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Download YouTube video
cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Quickly download YouTube video with hybrid-ytdl.",
    category: "main",
    use: ".video <video name or URL>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a video name or URL. 📝\nExample: .video Despacito`
        );
      }

      reply("```🔍 Searching for the video... 🎥```");

      // Get video info
      const info = await getVideoInfo(searchQuery);
      if (!info.status) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, creator, thumbnail, url: videoUrl } = info;
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}s\n👁️ *Views* - ${views}\n👤 *Author* - ${creator}\n🔗 *Link* - ${videoUrl}`;

      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

      // Download video with highest resolution
      const videoData = await downloadVideo(videoUrl, "1080");
      if (!videoData.status) {
        return reply("❌ Failed to fetch video download URL. 😢");
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
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);
