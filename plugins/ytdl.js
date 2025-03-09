const { cmd } = require("../command");
const puppeteer = require("puppeteer");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Proxy list (HTTP proxies only, optional)
const proxyList = [
  "--proxy-server=http://172.67.177.156:80",
  "--proxy-server=http://172.67.180.43:80",
  "--proxy-server=http://23.227.38.54:80",
];

// Function to launch Puppeteer with proxy (optional)
const launchBrowser = async () => {
  const proxy = proxyList[0]; // Change index to use different proxy, or remove for no proxy
  return await puppeteer.launch({
    headless: "new", // Headless mode for efficiency
    args: proxy ? [proxy, "--no-sandbox", "--disable-setuid-sandbox"] : ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

// Helper function to extract download link from YouTube
const getDownloadLink = async (videoUrl, type = "audio") => {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.217 Safari/537.36"
    );

    // Go to a third-party YouTube downloader site (e.g., y2mate.is)
    await page.goto("https://y2mate.is/", { waitUntil: "networkidle2" });

    // Enter the YouTube URL
    await page.type("#searchInput", videoUrl);
    await page.click("#searchBtn");
    await page.waitForSelector(".download-options", { timeout: 15000 });

    // Select format (audio or video)
    if (type === "audio") {
      await page.click(".mp3-option"); // Assuming the site has an identifiable mp3 option
    } else {
      await page.click(".mp4-option"); // Assuming the site has an identifiable mp4 option
    }

    await page.waitForSelector(".download-link", { timeout: 15000 });

    // Extract the download link
    const downloadLink = await page.evaluate(() => {
      return document.querySelector(".download-link").href;
    });

    return downloadLink;
  } catch (error) {
    console.error("Puppeteer error:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

// Download file from URL
const downloadFile = async (url, filePath) => {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for the file to start downloading (this depends on the site's behavior)
    await page.waitForTimeout(5000); // Adjust based on download speed

    // Simulate clicking the download link if needed
    const fileBuffer = await page.evaluate(async (downloadUrl) => {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsArrayBuffer(blob);
      });
    }, url);

    await writeFile(filePath, Buffer.from(fileBuffer));
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

// Command to download audio
cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Download YouTube audio using browser simulation.",
    category: "main",
    use: ".song <song name or keywords>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(`❗️ Please provide a song name or keywords. 📝\nExample: .song Despacito`);
      }

      reply("```🔍 Searching for the song... 🎵```");

      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, thumbnail } = searchResults.videos[0];
      const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${author.name}\n> File Name ${title}.mp3`;

      await conn.sendMessage(from, { image: { url: thumbnail }, caption: ytmsg });

      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

      // Get download link and download file
      const downloadLink = await getDownloadLink(videoUrl, "audio");
      await downloadFile(downloadLink, tempFileName);

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

      // Clean up
      await unlink(tempFileName);
    } catch (e) {
      reply(`❌ Error downloading audio: ${e.message}. Try again later.`);
      console.error(e);
    }
  }
);

// Command to download video
cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Download YouTube video using browser simulation.",
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

      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const { title, duration, views, author, url: videoUrl, thumbnail } = searchResults.videos[0];
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}\n🔗 *Link* - ${videoUrl}`;

      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

      // Get download link and download file
      const downloadLink = await getDownloadLink(videoUrl, "video");
      await downloadFile(downloadLink, tempFileName);

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

      // Clean up
      await unlink(tempFileName);
    } catch (e) {
      reply(`❌ Error downloading video: ${e.message}. Try again later.`);
      console.error(e);
    }
  }
);
