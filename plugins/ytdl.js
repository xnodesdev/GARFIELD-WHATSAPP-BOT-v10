const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const Bottleneck = require("bottleneck");
const fetch = require("node-fetch");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

// Modified rate limiter with more conservative settings to avoid IP blocks
const limiter = new Bottleneck({
  minTime: 5000, // 1 request every 5 seconds
  maxConcurrent: 1, // Only 1 concurrent request to avoid detection
  reservoir: 5, // Maximum 5 requests
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 60 * 1000, // Refill every minute
});

// More advanced and recent browser-like headers
const getRandomUserAgent = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.217 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.216 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.215 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/125.0.2455.44 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

// Enhanced browser fingerprint
const getBrowserFingerprint = () => {
  return {
    "User-Agent": getRandomUserAgent(),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
    "sec-ch-ua": `"Google Chrome";v="120", "Chromium";v="120", "Not=A?Brand";v="99"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "Referer": "https://www.google.com/",
  };
};

// Enhanced options for ytdl without proxies
const getYtdlOptions = () => {
  return {
    requestOptions: {
      headers: getBrowserFingerprint(),
    },
  };
};

// Enhanced cookies fetching without proxy support
const getCookies = async (url) => {
  try {
    const fetchOptions = {
      headers: getBrowserFingerprint(),
      redirect: 'follow',
    };
    
    const response = await fetch(url, fetchOptions);
    const cookies = response.headers.get("set-cookie");
    
    // Store YouTube consent cookies to bypass age verification
    if (cookies) {
      const cookieObj = {};
      cookies.split(',').forEach(cookie => {
        const parts = cookie.split(';')[0].trim().split('=');
        if (parts.length === 2) {
          cookieObj[parts[0]] = parts[1];
        }
      });
      
      return {
        Cookie: cookies.split(';').map(c => c.split(',')[0]).join('; '),
        'x-youtube-identity-token': cookieObj['YSC'] || ''
      };
    }
    return {};
  } catch (error) {
    console.error("Error fetching cookies:", error);
    return {};
  }
};

// Function to handle YouTube CAPTCHA and bot detection errors
const handleYouTubeErrors = async (videoUrl, retry = 0) => {
  if (retry >= 3) {
    throw new Error("Maximum retries reached, YouTube might be blocking this request.");
  }
  
  console.log(`Retrying (attempt ${retry + 1})`);
  
  // Get fresh cookies
  const cookies = await getCookies(videoUrl);
  
  // Wait before retrying (increasing backoff)
  await new Promise(resolve => setTimeout(resolve, 5000 * (retry + 1)));
  
  return {
    cookies,
    retryCount: retry + 1
  };
};

// Enhanced error handler
const handleErrors = (reply, errorMsg) => async (e, videoUrl = null) => {
  console.error(e);
  
  if (e.message.includes("parsing watch.html") ||
      e.message.includes("blocked") ||
      e.message.includes("CAPTCHA") ||
      e.message.includes("403") ||
      e.message.includes("confirm human")) {
      
      
      if (videoUrl) {
        try {
          // Try with alternate method
          const { cookies, retryCount } = await handleYouTubeErrors(videoUrl);
          

          
          // Return info for retry
          return {
            shouldRetry: true,
            cookies
          };
        } catch (retryError) {
          reply("❌ All retry attempts failed. Your IP might be temporarily blocked by YouTube. Try again later.");
          return { shouldRetry: false };
        }
      }
  }
  
  reply(errorMsg);
  return { shouldRetry: false };
};

// Download YouTube audio (optimized to avoid CAPTCHA)
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
        return reply(
          `❗️ Please provide a song name or keywords. 📝\nExample: .audio Despacito`
        );
      }
      
      reply("```🔍 Searching for the song... 🎵```");
      
      // Use limiter for search to avoid detection
      const searchResults = await limiter.schedule(() => yts(searchQuery));
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const { title, duration, views, author, url: videoUrl, thumbnail } =
        searchResults.videos[0];
      const ytmsg = `*🎶 Song Name* - ${title}\n*🕜 Duration* - ${duration}\n*📻 Listeners* - ${views}\n*🎙️ Artist* - ${author.name}\n> File Name ${title}.mp3`;
      
      // Send song details with thumbnail
      await conn.sendMessage(from, { image: { url: thumbnail }, caption: ytmsg });
      
      const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;
      
      // Try with initial configuration
      let ytdlOptions = getYtdlOptions();
      let cookies = await getCookies(videoUrl);
      let retryCount = 0;
      let success = false;
      
      while (!success && retryCount < 3) {
        try {
          // Add cookies to options
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
          
          // Get video info with optimized options

          
          const info = await limiter.schedule(() =>
            ytdl.getInfo(videoUrl, optionsWithCookies)
          );
          
          const audioFormat = ytdl
            .filterFormats(info.formats, "audioonly")
            .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];
            
          if (!audioFormat) {
            return reply("❌ No suitable audio format found. 😢");
          }
          
          // Download audio with optimized streaming
          reply("_⏳ Downloading..._");
          
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
          success = true;
          
        } catch (e) {
          const result = await handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e, videoUrl);
          
          if (result.shouldRetry) {
            cookies = result.cookies;
            ytdlOptions = getYtdlOptions();
            retryCount++;
          } else {
            // Clean up if file exists
            if (fs.existsSync(tempFileName)) {
              await unlink(tempFileName);
            }
            return; // Exit if no more retries
          }
        }
      }
      
      if (!success) {
        reply("❌ Could not download audio after multiple attempts. YouTube's anti-bot protection is active.");
      }
      
    } catch (e) {
      await handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Download YouTube video (optimized to avoid CAPTCHA) - similar modifications as the audio function
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
        return reply(
          `❗️ Please provide a video name or keywords. 📝\nExample: .video Despacito`
        );
      }
      
      reply("```🔍 Searching for the video... 🎥```");
      
      // Use limiter for search to avoid detection
      const searchResults = await limiter.schedule(() => yts(searchQuery));
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const { title, duration, views, author, url: videoUrl, thumbnail } =
        searchResults.videos[0];
      const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}\n🔗 *Link* - ${videoUrl}`;
      
      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;
      
      // Try with initial configuration
      let ytdlOptions = getYtdlOptions();
      let cookies = await getCookies(videoUrl);
      let retryCount = 0;
      let success = false;
      
      while (!success && retryCount < 3) {
        try {
          // Add cookies to options
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
          
          // Get video info with optimized options
          reply(`⏳ Fetching video information... ${retryCount > 0 ? `(Attempt ${retryCount + 1}/3)` : ''}`);
          
          const info = await limiter.schedule(() =>
            ytdl.getInfo(videoUrl, optionsWithCookies)
          );
          
          // Select best format that includes both video and audio
          let videoFormat = ytdl
            .filterFormats(info.formats, "videoandaudio")
            .sort((a, b) => parseInt(a.height || 0) - parseInt(b.height || 0))
            .pop();
            
          // Fallback to separate audio and video if needed
          if (!videoFormat) {
            const videoFormats = ytdl.filterFormats(info.formats, "videoonly");
            const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
            
            if (videoFormats.length && audioFormats.length) {
              videoFormat = videoFormats.sort((a, b) => parseInt(a.height || 0) - parseInt(b.height || 0)).pop();
              reply("⚠️ Using alternate download method. Quality may be reduced.");
            } else {
              return reply("❌ No suitable video format found. 😢");
            }
          }
          
          // Download video
          reply("_⏳ Downloading video..._");
          
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
          success = true;
          
        } catch (e) {
          const result = await handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e, videoUrl);
          
          if (result.shouldRetry) {
            cookies = result.cookies;
            ytdlOptions = getYtdlOptions();
            retryCount++;
          } else {
            // Clean up if file exists
            if (fs.existsSync(tempFileName)) {
              await unlink(tempFileName);
            }
            return; // Exit if no more retries
          }
        }
      }
      
      if (!success) {
        reply("❌ Could not download video after multiple attempts. YouTube's anti-bot protection is active.");
      }
      
    } catch (e) {
      await handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);
