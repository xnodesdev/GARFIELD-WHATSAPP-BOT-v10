const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");

// Promisify fs methods for better async handling
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Custom headers to mimic a browser request
const ytdlOptions = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  },
};

// Helper function to handle errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  reply(errorMsg);
};

// Create a cookie agent (optional, for private/restricted videos)
const cookies = [
  {
    domain: ".youtube.com",
    name: "SAPISID",
    value: "-dluw4VrSxq-MtTZ/AW-UIF_IAnRVeajVe",
    path: "/",
    secure: true,
    httpOnly: true,
  },
];
const agent = ytdl.createAgent(cookies);

// Download YouTube audio
cmd(
  {
    pattern: "play",
    react: "🎶",
    desc: "Download YouTube audio by searching for keywords.",
    category: "main",
    use: ".audio <song name or keywords>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a song name or keywords. 📝\nExample: .audio Despacito`
        );
      }

      reply("```🔍 Searching for the song... 🎵```");

      // Search for the song using yt-search
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      // Get video info with custom headers and cookies
      const info = await ytdl.getInfo(videoUrl, { ...ytdlOptions, agent });
      const audioFormat = ytdl
        .filterFormats(info.formats, "audioonly")
        .find((f) => f.audioBitrate === 128);
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }

      // Download audio
      const audioStream = ytdl.downloadFromInfo(info, {
        quality: audioFormat.itag,
      });
      await new Promise((resolve, reject) => {
        audioStream
          .pipe(fs.createWriteStream(tempFileName))
          .on("finish", resolve)
          .on("error", reject);
      });

      // Send the audio file
      await conn.sendMessage(
        from,
        {
          document: await readFile(tempFileName),
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
        },
        { quoted: mek }
      );

      // Delete the temporary file
      await unlink(tempFileName);
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(
        e
      );
    }
  }
);

// Download YouTube video
cmd(
  {
    pattern: "yt",
    react: "🎥",
    desc: "Download YouTube video by searching for keywords.",
    category: "main",
    use: ".video <video name or keywords>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a video name or keywords. 📝\nExample: .video Despacito`
        );
      }

      reply("```🔍 Searching for the video... 🎥```");

      // Search for the video using yt-search
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}\n🔗 *Link* - ${videoUrl}`;

      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

      // Get video info with custom headers and cookies
      const info = await ytdl.getInfo(videoUrl, { ...ytdlOptions, agent });
      const videoFormat = ytdl
        .filterFormats(info.formats, "videoandaudio")
        .find((f) => f.qualityLabel === "360p");
      if (!videoFormat) {
        return reply("❌ No suitable video format found. 😢");
      }

      // Download video
      const videoStream = ytdl.downloadFromInfo(info, {
        quality: videoFormat.itag,
      });
      await new Promise((resolve, reject) => {
        videoStream
          .pipe(fs.createWriteStream(tempFileName))
          .on("finish", resolve)
          .on("error", reject);
      });

      // Send the video file
      await conn.sendMessage(
        from,
        {
          document: await readFile(tempFileName),
          mimetype: "video/mp4",
          caption: ytmsg,
          filename:`${title}.mp4`
        },
        { quoted: mek }
      );

      // Delete the temporary file
      await unlink(tempFileName);
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(
        e
      );
    }
  }
);
