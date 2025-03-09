const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const Bottleneck = require("bottleneck");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Proxy Configuration (HTTP/HTTPS proxies only)
const proxyList = [
  { uri: "http://172.67.177.156:80" }, // US, HTTP
  { uri: "http://172.67.180.43:80" }, // US, HTTP
  { uri: "http://172.67.176.180:80" }, // US, HTTP
  { uri: "http://172.67.70.9:80" }, // US, HTTP
  { uri: "http://172.67.180.30:80" }, // US, HTTP
  { uri: "http://172.67.167.57:80" }, // US, HTTP
  { uri: "http://172.67.167.67:80" }, // US, HTTP
  { uri: "http://23.227.38.54:80" }, // Canada, HTTP
  { uri: "http://31.43.179.120:80" }, // Kazakhstan, HTTP
];

// Function to validate and create proxy agent
const createProxyAgent = (proxyUri) => {
  try {
    if (!proxyUri.startsWith("http://") && !proxyUri.startsWith("https://")) {
      throw new Error("Invalid proxy protocol. Use 'http://' or 'https://'");
    }
    console.log(`Using proxy: ${proxyUri}`);
    return ytdl.createProxyAgent({ uri: proxyUri });
  } catch (error) {
    console.error("Proxy creation error:", error.message);
    return null; // Fallback to no proxy if invalid
  }
};

// Select a proxy (e.g., first HTTP proxy)
const selectedProxy = proxyList[0]; // Change index to test other proxies
const proxyAgent = createProxyAgent(selectedProxy.uri);

// Rate limiter for faster but safe requests (optimized for 2025)
const limiter = new Bottleneck({
  minTime: 1500, // 1 request every 1.5 seconds
  maxConcurrent: 2, // Allow 2 concurrent requests
});

// Enhanced browser-like headers with 2025 compatibility
const getRandomUserAgent = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.217 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.216 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.215 Safari/537.36",
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

// Default ytdl options with proxy
const ytdlOptions = {
  agent: proxyAgent || undefined, // Use proxyAgent if valid, else fallback to no proxy
  requestOptions: {
    headers: {
      "User-Agent": getRandomUserAgent(),
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
    },
  },
};

// Helper function to handle errors with YouTube-specific messages
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  if (e.message.includes("parsing watch.html") || e.message.includes("blocked") || e.message.includes("CAPTCHA")) {
    reply(
      "❌ YouTube has made changes or detected automated access. Try a different proxy or wait. Report to https://github.com/distubejs/ytdl-core/issues. 😢"
    );
  } else if (e.message.includes("URL protocol")) {
    reply("❌ Proxy URL protocol error. Only 'http://' or 'https://' proxies are supported.");
  } else {
    reply(errorMsg);
  }
};

// Download YouTube audio
cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Quickly download YouTube audio by searching for keywords.",
    category: "main",
    use: ".audio <song name or keywords>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(`❗️ Please provide a song name or keywords. 📝\nExample: .audio Despacito`);
      }

      reply("```🔍 Searching for the song... 🎵```");

      const searchResults = await limiter.schedule(() => yts(searchQuery));
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, thumbnail } = searchResults.videos[0];
      const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${author.name}\n> File Name ${title}.mp3`;

      await conn.sendMessage(from, { image: { url: thumbnail }, caption: ytmsg });

      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      const info = await limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions));
      const audioFormat = ytdl
        .filterFormats(info.formats, "audioonly")
        .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }

      const audioStream = ytdl.downloadFromInfo(info, {
        quality: audioFormat.itag,
        ...ytdlOptions,
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
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Download YouTube video
cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Quickly download YouTube video by searching for keywords.",
    category: "main",
    use: ".video <video name or keywords>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(`❗️ Please provide a video name or keywords. 📝\nExample: .video Despacito`);
      }

      reply("```🔍 Searching for the video... 🎥```");

      const searchResults = await limiter.schedule(() => yts(searchQuery));
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, thumbnail } = searchResults.videos[0];
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}\n🔗 *Link* - ${videoUrl}`;

      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

      const info = await limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions));
      const videoFormat = ytdl
        .filterFormats(info.formats, "videoandaudio")
        .sort((a, b) => (b.qualityLabel || "").localeCompare(a.qualityLabel || ""))[0];
      if (!videoFormat) {
        return reply("❌ No suitable video format found. 😢");
      }

      const videoStream = ytdl.downloadFromInfo(info, {
        quality: videoFormat.itag,
        ...ytdlOptions,
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
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);
