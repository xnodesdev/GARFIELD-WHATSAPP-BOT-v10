const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const Bottleneck = require("bottleneck");
const fetch = require("node-fetch"); // Ensure this is installed

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Rate limiter with conservative settings
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
  try {
    const response = await fetch(url, {
      headers: ytdlOptions.requestOptions.headers,
    });
    const cookies = response.headers.get("set-cookie");
    return cookies ? { Cookie: cookies.split(";")[0] } : {};
  } catch (error) {
    console.error("Error fetching cookies:", error);
    return {};
  }
};

// Helper function to handle errors with specific YouTube parsing errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  if (e.message.includes("parsing watch.html")) {
    reply(
      "❌ YouTube has made changes to its website, causing an error. Please try again later or report this issue to the library maintainers. 😢"
    );
  } else {
    reply(errorMsg);
  }
};

// Download YouTube audio (similar updates for video command)
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

      const info = await limiter.schedule(() =>
        ytdl.getInfo(videoUrl, optionsWithCookies)
      );
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

// Similarly update the "video" command with the same enhancements
