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

// Add your YouTube cookies here
const cookies = [
  {
    name: "SAPISID",
    value: "-dluw4VrSxq-MtTZ/AW-UIF_IAnRVeajVe",
    domain: ".youtube.com",
    path: "/",
    secure: true,
    httpOnly: true,
  },
  {
    name: "APISID",
    value: "1fl2qLX2zOKTjBNB/AF9y-UgG71yqVlWpB",
    domain: ".youtube.com",
    path: "/",
    secure: true,
    httpOnly: true,
  },
  {
    name: "HSID",
    value: "A2kh1bxoObs4HhAZd",
    domain: ".youtube.com",
    path: "/",
    secure: true,
    httpOnly: true,
  },
  {
    name: "SID",
    value: "g.a000uAhoA1gKgf=dollWk9UlQC_lyBcFMVscDrsDYSE80gkHU6_ZI9TMHREMO8Z57D077XgACgYKAZ8SARASFQHGX2MinK2xWUDMecJX4F_HRRSaBoVAUF8yKokoJcQD0iu_Fda0C0-RVke0076",
    domain: ".youtube.com",
    path: "/",
    secure: true,
    httpOnly: true,
  },
  {
    name: "LOGIN_INFO",
    value: "AFmmF2swRAlgZn0bZOU569l5CZRr0KAgQsy4YtruzqUy7sY3GArHEClPBN3jD3vBfx3SIOElNkzFZ4n1AwPV9v0DvwzKxF4ZozQUQ3MjNmd3oTlmATDfDcokupahHY4ViNbjMejGV30TRLQhUwXp2xSxTIOHpkaX9zVn1bcFJXU2RNGv2DW6zvK1RN3FR6W0TluWZDEwaOZBmfBMtEbnBVUpUN5NTFlKbVl0DNoxwT1l0V1ZxaIJUTToaFVRlRMdzNmbWlgQlaNWBpMnbphfPbWldaUXfMtMDBQeG9PDVg6ckp1S08xVTR3",
    domain: ".youtube.com",
    path: "/",
    secure: true,
    httpOnly: true,
  },
  {
    name: "PREF",
    value: "f6=40000000&tz=Asia.Colombo&f7=100&f4=4000000",
    domain: ".youtube.com",
    path: "/",
    secure: true,
    httpOnly: true,
  },
];

// Helper function to handle errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  reply(errorMsg);
};

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

      reply("🔍 Searching for the song... 🎵");

      // Search for the song using yt-search
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      // Get video info with custom headers and cookies
      const info = await ytdl.getInfo(videoUrl, {
        ...ytdlOptions,
        requestOptions: {
          headers: {
            ...ytdlOptions.headers,
            Cookie: cookies.map((c) => `${c.name}=${c.value}`).join("; "),
          },
        },
      });
      const audioFormat = ytdl
        .filterFormats(info.formats, "audioonly")
        .find((f) => f.audioBitrate === 128);
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }

      // Download audio
      const audioStream = ytdl.downloadFromInfo(info, {
        quality: audioFormat.itag,
        requestOptions: {
          headers: {
            ...ytdlOptions.headers,
            Cookie: cookies.map((c) => `${c.name}=${c.value}`).join("; "),
          },
        },
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
          caption: `${title} *has been Downloaded Successfullly ☁️*`
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

      reply("🔍 Searching for the video... 🎥");

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
      const info = await ytdl.getInfo(videoUrl, {
        ...ytdlOptions,
        requestOptions: {
          headers: {
            ...ytdlOptions.headers,
            Cookie: cookies.map((c) => `${c.name}=${c.value}`).join("; "),
          },
        },
      });
      const videoFormat = ytdl
        .filterFormats(info.formats, "videoandaudio")
        .find((f) => f.qualityLabel === "360p");
      if (!videoFormat) {
        return reply("❌ No suitable video format found. 😢");
      }

      // Download video
      const videoStream = ytdl.downloadFromInfo(info, {
        quality: videoFormat.itag,
        requestOptions: {
          headers: {
            ...ytdlOptions.headers,
            Cookie: cookies.map((c) => `${c.name}=${c.value}`).join("; "),
          },
        },
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
          filename: `${title}.mp4`
          caption: ytmsg
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
