const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const Bottleneck = require("bottleneck");
const path = require("path");
const stream = require("stream");
const { pipeline } = require("stream/promises");

// Promisified functions
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);

// Ensure store directory exists
(async () => {
  try {
    const storeDir = './store';
    if (!fs.existsSync(storeDir)) {
      await mkdir(storeDir);
      console.log('Created store directory');
    }
  } catch (err) {
    console.error('Failed to create store directory:', err);
  }
})();

// Rate limiter to control API requests
const limiter = new Bottleneck({
  minTime: 2000,        // More conservative: 2 seconds between requests
  maxConcurrent: 1,     // Only one request at a time
  reservoir: 10,        // Start with 10 tokens
  reservoirRefreshAmount: 10,
  reservoirRefreshInterval: 60 * 1000, // Refill every minute
});

// Enhanced YouTube headers to avoid human verification challenges
const ytdlOptions = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Sec-CH-UA": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "Sec-CH-UA-Mobile": "?0",
    "Sec-CH-UA-Platform": "\"Windows\"",
    "Priority": "u=0, i"
  },
  cookieJar: new (require('tough-cookie')).CookieJar(),
};

// Retry mechanism for failed requests
const retry = async (fn, maxRetries = 3, delay = 2000) => {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt}/${maxRetries} failed:`, err.message);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
      }
    }
  }
  throw lastError;
};

// Enhanced error handler with detailed logging
const handleErrors = (reply, errorMsg) => (e) => {
  const errorDetails = {
    message: e.message,
    stack: e.stack,
    timestamp: new Date().toISOString(),
  };
  
  // Log detailed error for debugging
  console.error('ERROR DETAILS:', JSON.stringify(errorDetails, null, 2));
  
  // Send user-friendly message
  reply(`${errorMsg}\n\nError code: ${e.message.includes('confirm you are human') ? 'HUMAN_VERIFICATION_REQUIRED' : 'DOWNLOAD_FAILED'}`);
};

// Helper function to sanitize filenames
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[\\/:*?"<>|]/g, '_') // Replace invalid file characters
    .replace(/\s+/g, '_')          // Replace spaces with underscores
    .substring(0, 200);            // Limit filename length
};

// Main song download command
cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Download YouTube audio by searching for keywords.",
    category: "main",
    use: ".song <song name or keywords>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(
          `❗️ Please provide a song name or keywords. 📝\nExample: .song Despacito`
        );
      }
      
      reply("```🔍 Searching for the song... 🎵```");
      
      // Search with retry mechanism and rate limiting
      const searchResults = await retry(() => 
        limiter.schedule(() => yts(searchQuery))
      );
      
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
        
      // Check if the duration is too long (prevent large downloads)
      const durationParts = duration.split(':').map(Number);
      const durationInSeconds = durationParts.length === 3 
        ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
        : durationParts[0] * 60 + durationParts[1];
        
      if (durationInSeconds > 600) { // 10 minutes max
        return reply(`❌ Song is too long (${duration}). Please choose songs under 10 minutes. 😊`);
      }
      
      const ytmsg = `*🎶 Song Found!*\n\n*📌 Title:* ${title}\n*⏱️ Duration:* ${duration}\n*👀 Views:* ${views}\n*🎤 Artist:* ${author.name}\n\n_Downloading... Please wait_ ⏳`;
      
      // Send song details with thumbnail
      await conn.sendMessage(from, { image: { url: image }, caption: ytmsg });
      
      // Create safe filename
      const safeTitle = sanitizeFilename(title);
      const tempFileName = path.join('./store', `yt_audio_${safeTitle}_${Date.now()}.mp3`);
      
      // Get video info with retry mechanism
      const info = await retry(() => 
        limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions))
      );
      
      // Get the best audio format (prioritize higher quality)
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      
      // Sort by audio quality and select the best one
      audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
      const audioFormat = audioFormats[0];
      
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }
      
      // Download with error handling and progress tracking
      try {
        const audioStream = ytdl.downloadFromInfo(info, {
          quality: audioFormat.itag,
          ...ytdlOptions
        });
        
        // Use pipeline for better stream handling
        await pipeline(
          audioStream,
          fs.createWriteStream(tempFileName)
        );
        
        // Send success message
        reply(`✅ Download successful! Sending your audio now...`);
        
        // Send the audio file
        await conn.sendMessage(
          from,
          {
            audio: await readFile(tempFileName),
            mimetype: "audio/mpeg",
            fileName: `${safeTitle}.mp3`,
          },
          { quoted: mek }
        );
        
        // Delete the temporary file
        await unlink(tempFileName);
      } catch (downloadError) {
        // If stream download fails, try alternative method
        reply(`⚠️ Primary download method failed. Trying alternative method...`);
        
        const fallbackFormat = audioFormats.find(f => f.itag !== audioFormat.itag);
        if (!fallbackFormat) {
          throw new Error("No alternative audio format available");
        }
        
        const fallbackStream = ytdl.downloadFromInfo(info, {
          quality: fallbackFormat.itag,
          ...ytdlOptions
        });
        
        await pipeline(
          fallbackStream,
          fs.createWriteStream(tempFileName)
        );
        
        // Send the audio file
        await conn.sendMessage(
          from,
          {
            audio: await readFile(tempFileName),
            mimetype: "audio/mpeg",
            fileName: `${safeTitle}.mp3`,
          },
          { quoted: mek }
        );
        
        // Delete the temporary file
        await unlink(tempFileName);
      }
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Enhanced video download command
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
      
      // Search with retry mechanism
      const searchResults = await retry(() => 
        limiter.schedule(() => yts(searchQuery))
      );
      
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const { title, duration, views, author, url: videoUrl, image } =
        searchResults.videos[0];
        
      // Check duration to avoid large files
      const durationParts = duration.split(':').map(Number);
      const durationInSeconds = durationParts.length === 3 
        ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
        : durationParts[0] * 60 + durationParts[1];
        
      if (durationInSeconds > 300) { // 5 minutes max for videos
        return reply(`❌ Video is too long (${duration}). Please choose videos under 5 minutes. 😊`);
      }
      
      const ytmsg = `🎬 *Video Found!*\n\n*📌 Title:* ${title}\n*⏱️ Duration:* ${duration}\n*👁️ Views:* ${views}\n*👤 Channel:* ${author.name}\n\n_Downloading... Please wait_ ⏳`;
      
      // Send video details with thumbnail
      await conn.sendMessage(from, { image: { url: image }, caption: ytmsg });
      
      // Create safe filename
      const safeTitle = sanitizeFilename(title);
      const tempFileName = path.join('./store', `yt_video_${safeTitle}_${Date.now()}.mp4`);
      
      // Get video info with retry
      const info = await retry(() => 
        limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions))
      );
      
      // Get available video formats
      const videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
      
      // Quality selection - prefer 360p first, fall back to other qualities if not available
      let videoFormat = videoFormats.find(f => f.qualityLabel === '360p');
      if (!videoFormat) {
        videoFormat = videoFormats.find(f => f.qualityLabel === '240p') || 
                      videoFormats.find(f => f.qualityLabel === '480p') ||
                      videoFormats[0]; // Default to first available format
      }
      
      if (!videoFormat) {
        return reply("❌ No suitable video format found. 😢");
      }
      
      // Update user on progress
      reply(`📥 Found format: ${videoFormat.qualityLabel}. Starting download...`);
      
      try {
        // Download with proper error handling
        const videoStream = ytdl.downloadFromInfo(info, {
          quality: videoFormat.itag,
          ...ytdlOptions
        });
        
        // Use pipeline for better stream handling
        await pipeline(
          videoStream,
          fs.createWriteStream(tempFileName)
        );
        
        // Check file size to avoid transmission errors
        const stats = await fs.promises.stat(tempFileName);
        const fileSizeInMB = stats.size / (1024 * 1024);
        
        if (fileSizeInMB > 50) {
          await unlink(tempFileName);
          return reply(`❌ Video file is too large (${fileSizeInMB.toFixed(2)}MB). Please try a shorter video. 😢`);
        }
        
        // Send success message
        reply(`✅ Download successful! Sending your video now...`);
        
        // Send the video file
        await conn.sendMessage(
          from,
          {
            video: await readFile(tempFileName),
            caption: `🎥 *${title}*\n⏱️ *Duration:* ${duration}\n👁️ *Views:* ${views}`,
            mimetype: "video/mp4",
          },
          { quoted: mek }
        );
        
        // Delete the temporary file
        await unlink(tempFileName);
      } catch (downloadError) {
        // If standard download fails, try alternative method
        reply(`⚠️ Primary download method failed. Trying alternative method...`);
        
        const fallbackFormat = videoFormats.find(f => f.itag !== videoFormat.itag) || videoFormat;
        
        const fallbackStream = ytdl.downloadFromInfo(info, {
          quality: fallbackFormat.itag,
          ...ytdlOptions
        });
        
        await pipeline(
          fallbackStream,
          fs.createWriteStream(tempFileName)
        );
        
        // Send the video file
        await conn.sendMessage(
          from,
          {
            video: await readFile(tempFileName),
            caption: `🎥 *${title}*\n⏱️ *Duration:* ${duration}\n👁️ *Views:* ${views}`,
            mimetype: "video/mp4",
          },
          { quoted: mek }
        );
        
        // Delete the temporary file
        await unlink(tempFileName);
      }
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Add a new command for audio-only version with higher quality
cmd(
  {
    pattern: "audio",
    react: "🔊",
    desc: "Download high quality YouTube audio by searching for keywords.",
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
      
      reply("```🔍 Searching for high quality audio... 🎧```");
      
      // Search with retry
      const searchResults = await retry(() => limiter.schedule(() => yts(searchQuery)));
      
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const { title, duration, views, author, url: videoUrl, image } = searchResults.videos[0];
      
      // Check duration
      const durationParts = duration.split(':').map(Number);
      const durationInSeconds = durationParts.length === 3 
        ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
        : durationParts[0] * 60 + durationParts[1];
        
      if (durationInSeconds > 900) { // 15 minutes max
        return reply(`❌ Audio is too long (${duration}). Please choose audio under 15 minutes. 😊`);
      }
      
      const ytmsg = `*🎧 High Quality Audio*\n\n*📌 Title:* ${title}\n*⏱️ Duration:* ${duration}\n*👀 Views:* ${views}\n*🎤 Artist:* ${author.name}\n\n_Preparing HQ audio... Please wait_ ⏳`;
      
      await conn.sendMessage(from, { image: { url: image }, caption: ytmsg });
      
      // Create safe filename
      const safeTitle = sanitizeFilename(title);
      const tempFileName = path.join('./store', `yt_hq_audio_${safeTitle}_${Date.now()}.mp3`);
      
      // Get best quality audio
      const info = await retry(() => limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions)));
      
      // Sort formats by audio bitrate and select the highest quality
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
      
      const audioFormat = audioFormats[0];
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }
      
      reply(`🎵 Found high quality audio format (${audioFormat.audioBitrate}kbps). Downloading...`);
      
      // Download with error handling
      try {
        const audioStream = ytdl.downloadFromInfo(info, {
          quality: audioFormat.itag,
          ...ytdlOptions
        });
        
        await pipeline(audioStream, fs.createWriteStream(tempFileName));
        
        // Send the audio file
        await conn.sendMessage(
          from,
          {
            audio: await readFile(tempFileName),
            mimetype: "audio/mpeg",
            fileName: `${safeTitle} (HQ).mp3`,
          },
          { quoted: mek }
        );
        
        // Delete the temporary file
        await unlink(tempFileName);
      } catch (downloadError) {
        console.error("Primary audio download failed:", downloadError);
        reply(`⚠️ Primary download method failed. Trying alternative method...`);
        
        // Try next best format
        const fallbackFormat = audioFormats[1] || audioFormats[0];
        
        const fallbackStream = ytdl.downloadFromInfo(info, {
          quality: fallbackFormat.itag,
          ...ytdlOptions
        });
        
        await pipeline(fallbackStream, fs.createWriteStream(tempFileName));
        
        await conn.sendMessage(
          from,
          {
            audio: await readFile(tempFileName),
            mimetype: "audio/mpeg",
            fileName: `${safeTitle} (HQ).mp3`,
          },
          { quoted: mek }
        );
        
        await unlink(tempFileName);
      }
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Add a search command to list multiple results
cmd(
  {
    pattern: "ytsearch",
    react: "🔍",
    desc: "Search YouTube and list multiple results.",
    category: "main",
    use: ".ytsearch <search query>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(`❗️ Please provide a search query. 📝\nExample: .ytsearch best songs 2024`);
      }
      
      reply("```🔍 Searching YouTube... Please wait.```");
      
      // Search with rate limiting
      const searchResults = await limiter.schedule(() => yts(searchQuery));
      
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      // List top 5 results
      const videos = searchResults.videos.slice(0, 5);
      
      let resultMessage = `🔍 *YouTube Search Results*\n\n`;
      
      videos.forEach((video, index) => {
        resultMessage += `*${index + 1}. ${video.title}*\n`;
        resultMessage += `⏱️ Duration: ${video.duration}\n`;
        resultMessage += `👁️ Views: ${video.views}\n`;
        resultMessage += `👤 Channel: ${video.author.name}\n`;
        resultMessage += `🔗 URL: ${video.url}\n\n`;
      });
      
      resultMessage += `To download, use:\n.song <title> - for audio\n.video <title> - for video`;
      
      await conn.sendMessage(from, { image: { url: videos[0].thumbnail }, caption: resultMessage });
      
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while searching. 😢")(e);
    }
  }
);
