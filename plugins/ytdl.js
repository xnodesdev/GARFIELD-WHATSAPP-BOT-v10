const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const Bottleneck = require("bottleneck");
const fetch = require("node-fetch"); // Add this dependency

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Rate limiter with more conservative settings
const limiter = new Bottleneck({
  minTime: 2000, // 1 request every 2 seconds
  maxConcurrent: 1, // Only 1 request at a time
});

// Enhanced browser-like headers with randomization
const getRandomUserAgent = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const ytdlOptions = {
  requestOptions: {
    headers: {
      "User-Agent": getRandomUserAgent(),
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    },
  },
};

// Helper function to fetch cookies (simulate browser session)
const getCookies = async (url) => {
  const response = await fetch(url, {
    headers: ytdlOptions.requestOptions.headers,
  });
  const cookies = response.headers.get("set-cookie");
  return cookies ? { Cookie: cookies.split(";")[0] } : {};
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

      const searchResults = await limiter.schedule(() => yts(searchQuery));
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
      const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${author.name}\n> File Name ${title}.mp3`;

      await conn.sendMessage(from, { image: { url: image }, caption: ytmsg });

      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      // Fetch cookies to simulate browser behavior
      const cookies = await getCookies(videoUrl);
      const optionsWithCookies = {
        ...ytdlOptions,
        requestOptions: {
          ...ytdlOptions.requestOptions,
          headers: {
            ...ytdlOptions.requestOptions.headers,
            ...cookies,
          },
        },
      };

      const info = await limiter.schedule(() => ytdl.getInfo(videoUrl, optionsWithCookies));
      const audioFormat = ytdl
        .filterFormats(info.formats, "audioonly")
        .find((f) => f.audioBitrate === 128);
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }

      const audioStream = ytdl.downloadFromInfo(info, {
        quality: audioFormat.itag,
        ...optionsWithCookies,
      });
      await new Promise((resolve, reject) => {
        audioStream
          .pipe(fs.createWriteStream(tempFileName))
          .on("finish", resolve)
          .on("error", reject);
      });

      await conn.sendMessage(
        from,
        {
          audio: await readFile(tempFileName),
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
        },
        { quoted: mek }
      );

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
    pattern: "video",
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

      const searchResults = await limiter.schedule(() => yts(searchQuery));
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}\n🔗 *Link* - ${videoUrl}`;

      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

      // Fetch cookies to simulate browser behavior
      const cookies = await getCookies(videoUrl);
      const optionsWithCookies = {
        ...ytdlOptions,
        requestOptions: {
          ...ytdlOptions.requestOptions,
          headers: {
            ...ytdlOptions.requestOptions.headers,
            ...cookies,
          },
        },
      };

      const info = await limiter.schedule(() => ytdl.getInfo(videoUrl, optionsWithCookies));
      const videoFormat = ytdl
        .filterFormats(info.formats, "videoandaudio")
        .find((f) => f.qualityLabel === "360p");
      if (!videoFormat) {
        return reply("❌ No suitable video format found. 😢");
      }

      const videoStream = ytdl.downloadFromInfo(info, {
        quality: videoFormat.itag,
        ...optionsWithCookies,
      });
      await new Promise((resolve, reject) => {
        videoStream
          .pipe(fs.createWriteStream(tempFileName))
          .on("finish", resolve)
          .on("error", reject);
      });

      await conn.sendMessage(
        from,
        {
          document: await readFile(tempFileName),
          mimetype: "video/mp4",
          caption: ytmsg,
        },
        { quoted: mek }
      );

      await unlink(tempFileName);
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(
        e
      );
    }
  }
);
