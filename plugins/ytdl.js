const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const Bottleneck = require("bottleneck");
const path = require("path");
const { pipeline } = require("stream/promises");

// Promisified functions
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
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

// Rate limiter with optimized settings
const limiter = new Bottleneck({
  minTime: 1500,        // 1.5 seconds between requests (faster but still safe)
  maxConcurrent: 2,     // Allow 2 concurrent requests
  reservoir: 15,        // Start with 15 tokens
  reservoirRefreshAmount: 15,
  reservoirRefreshInterval: 60 * 1000, // Refill every minute
});

// Enhanced YouTube headers to avoid verification challenges
const ytdlOptions = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Sec-CH-UA": "\"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "Sec-CH-UA-Mobile": "?0",
    "Sec-CH-UA-Platform": "\"Windows\"",
    "Cache-Control": "max-age=0",
    "Priority": "u=0, i"
  },
  cookieJar: new (require('tough-cookie')).CookieJar(),
  highWaterMark: 1024 * 1024 * 3, // 3MB buffer for faster downloads
};

// Better retry mechanism with exponential backoff
const retry = async (fn, maxRetries = 5, initialDelay = 1000) => {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt}/${maxRetries} failed:`, err.message);
      
      // Check for specific errors to avoid unnecessary retries
      if (err.message.includes('Video unavailable') || 
          err.message.includes('This video is not available') ||
          err.message.includes('Video ID') ||
          err.message.includes('is invalid')) {
        throw err; // Don't retry for these errors
      }
      
      if (attempt < maxRetries) {
        // Exponential backoff with jitter
        const delay = initialDelay * Math.pow(1.5, attempt - 1) * (0.9 + 0.2 * Math.random());
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
};

// Enhanced error handler with proper duration handling
const handleErrors = (reply, errorMsg) => (e) => {
  const errorDetails = {
    message: e.message,
    stack: e.stack,
    timestamp: new Date().toISOString(),
  };
  
  // Log detailed error for debugging
  console.error('ERROR DETAILS:', JSON.stringify(errorDetails, null, 2));
  
  // Identify specific error types
  let errorCode = 'DOWNLOAD_FAILED';
  if (e.message.includes('confirm you are human')) {
    errorCode = 'HUMAN_VERIFICATION_REQUIRED';
  } else if (e.message.includes('duration')) {
    errorCode = 'DURATION_PARSE_ERROR';
  } else if (e.message.includes('status code')) {
    errorCode = 'SERVER_ERROR';
  }
  
  // Send user-friendly message
  reply(`${errorMsg}\n\nError code: ${errorCode}`);
};

// Parse duration string to seconds safely
const parseDuration = (durationStr) => {
  try {
    // Handle various duration formats
    if (!durationStr) return 0; // Default to 0 if no duration
    
    const parts = durationStr.split(':').map(p => parseInt(p.trim(), 10));
    
    if (parts.length === 3) {
      // Format: HH:MM:SS
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // Format: MM:SS
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 1 && !isNaN(parts[0])) {
      // Format: SS
      return parts[0];
    }
    return 0; // Default to 0 if format is unrecognized
  } catch (e) {
    console.error('Duration parsing error:', e);
    return 0; // Default to 0 if parsing fails
  }
};

// Helper function to sanitize filenames
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[\\/:*?"<>|]/g, '_') // Replace invalid file characters
    .replace(/\s+/g, '_')          // Replace spaces with underscores
    .substring(0, 200);            // Limit filename length
};

// Helper function to get the best format
const getBestFormat = (formats, type, preferredQuality = null) => {
  if (!formats || formats.length === 0) return null;
  
  let filteredFormats = ytdl.filterFormats(formats, type);
  
  if (filteredFormats.length === 0) return null;
  
  // For video, try to match preferred quality
  if (type === 'videoandaudio' && preferredQuality) {
    const matchedFormat = filteredFormats.find(f => f.qualityLabel === preferredQuality);
    if (matchedFormat) return matchedFormat;
  }
  
  // For audio, sort by bitrate
  if (type === 'audioonly') {
    filteredFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
    return filteredFormats[0];
  }
  
  // For video, prefer formats with both audio and video, sorted by resolution
  filteredFormats.sort((a, b) => {
    // First prioritize having both audio and video
    const aHasBoth = a.hasAudio && a.hasVideo ? 1 : 0;
    const bHasBoth = b.hasAudio && b.hasVideo ? 1 : 0;
    if (aHasBoth !== bHasBoth) return bHasBoth - aHasBoth;
    
    // Then sort by resolution (height)
    return (b.height || 0) - (a.height || 0);
  });
  
  return filteredFormats[0];
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
      
      if (!searchResults.videos || !searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const video = searchResults.videos[0];
      const { title, duration, views, author, url: videoUrl, image, thumbnail } = video;
      
      // Safely parse duration
      const durationInSeconds = parseDuration(duration);
      
      // Check if the duration is too long (prevent large downloads)
      if (durationInSeconds > 600) { // 10 minutes max
        return reply(`❌ Song is too long (${duration}). Please choose songs under 10 minutes. 😊`);
      }
      
      const ytmsg = `*🎶 Song Found!*\n\n*📌 Title:* ${title}\n*⏱️ Duration:* ${duration}\n*👀 Views:* ${views}\n*🎤 Artist:* ${author.name}\n\n_Downloading... Please wait_ ⏳`;
      
      // Send song details with thumbnail
      await conn.sendMessage(from, { image: { url: thumbnail || image }, caption: ytmsg });
      
      // Create safe filename
      const safeTitle = sanitizeFilename(title);
      const tempFileName = path.join('./store', `yt_audio_${safeTitle}_${Date.now()}.mp3`);
      
      // Get video info with retry mechanism
      const info = await retry(() =>
         limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions))
      );
      
      // Get the best audio format
      const audioFormat = getBestFormat(info.formats, 'audioonly');
      
      if (!audioFormat) {
        return reply("❌ No suitable audio format found. 😢");
      }
      
      // Download with error handling
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
        await unlink(tempFileName).catch(err => console.error("Error deleting temp file:", err));
      } catch (downloadError) {
        console.error("Primary download failed:", downloadError);
        
        // If stream download fails, try alternative method
        reply(`⚠️ Primary download method failed. Trying alternative method...`);
        
        // Get alternative format
        const alternativeFormats = ytdl.filterFormats(info.formats, 'audioonly')
          .filter(f => f.itag !== audioFormat.itag);
        
        if (!alternativeFormats.length) {
          throw new Error("No alternative audio format available");
        }
        
        // Sort by audio quality
        alternativeFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
        const fallbackFormat = alternativeFormats[0];
        
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
        await unlink(tempFileName).catch(err => console.error("Error deleting temp file:", err));
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
      
      if (!searchResults.videos || !searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const video = searchResults.videos[0];
      const { title, duration, views, author, url: videoUrl, image, thumbnail } = video;
      
      // Safely parse duration
      const durationInSeconds = parseDuration(duration);
      
      // Check duration to avoid large files
      if (durationInSeconds > 300) { // 5 minutes max for videos
        return reply(`❌ Video is too long (${duration}). Please choose videos under 5 minutes. 😊`);
      }
      
      const ytmsg = `🎬 *Video Found!*\n\n*📌 Title:* ${title}\n*⏱️ Duration:* ${duration}\n*👁️ Views:* ${views}\n*👤 Channel:* ${author.name}\n\n_Downloading... Please wait_ ⏳`;
      
      // Send video details with thumbnail
      await conn.sendMessage(from, { image: { url: thumbnail || image }, caption: ytmsg });
      
      // Create safe filename
      const safeTitle = sanitizeFilename(title);
      const tempFileName = path.join('./store', `yt_video_${safeTitle}_${Date.now()}.mp4`);
      
      // Get video info with retry
      const info = await retry(() =>
         limiter.schedule(() => ytdl.getInfo(videoUrl, ytdlOptions))
      );
      
      // Try to get 360p first, then fallback
      const preferredQualities = ['360p', '480p', '240p', '720p'];
      let videoFormat = null;
      
      for (const quality of preferredQualities) {
        videoFormat = getBestFormat(info.formats, 'videoandaudio', quality);
        if (videoFormat) break;
      }
      
      // If no preferred quality found, get best available
      if (!videoFormat) {
        videoFormat = getBestFormat(info.formats, 'videoandaudio');
      }
      
      if (!videoFormat) {
        return reply("❌ No suitable video format found. 😢");
      }
      
      // Update user on progress
      reply(`📥 Found format: ${videoFormat.qualityLabel || 'Best available'}. Starting download...`);
      
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
          await unlink(tempFileName).catch(err => console.error("Error deleting large file:", err));
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
        await unlink(tempFileName).catch(err => console.error("Error deleting temp file:", err));
      } catch (downloadError) {
        console.error("Primary video download failed:", downloadError);
        
        // If standard download fails, try alternative method
        reply(`⚠️ Primary download method failed. Trying alternative method...`);
        
        // Get available formats excluding the one that failed
        const alternativeFormats = ytdl.filterFormats(info.formats, 'videoandaudio')
          .filter(f => f.itag !== videoFormat.itag);
        
        if (!alternativeFormats.length) {
          throw new Error("No alternative video formats available");
        }
        
        // Sort by resolution
        alternativeFormats.sort((a, b) => (b.height || 0) - (a.height || 0));
        const fallbackFormat = alternativeFormats[0];
        
        const fallbackStream = ytdl.downloadFromInfo(info, {
          quality: fallbackFormat.itag,
          ...ytdlOptions
        });
        
        await pipeline(
          fallbackStream,
          fs.createWriteStream(tempFileName)
        );
        
        // Check file size again
        const stats = await fs.promises.stat(tempFileName);
        const fileSizeInMB = stats.size / (1024 * 1024);
        
        if (fileSizeInMB > 50) {
          await unlink(tempFileName).catch(err => console.error("Error deleting large file:", err));
          return reply(`❌ Video file is too large (${fileSizeInMB.toFixed(2)}MB). Please try a shorter video. 😢`);
        }
        
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
        await unlink(tempFileName).catch(err => console.error("Error deleting temp file:", err));
      }
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// High quality audio command
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
      
      if (!searchResults.videos || !searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      const video = searchResults.videos[0];
      const { title, duration, views, author, url: videoUrl, image, thumbnail } = video;
      
      // Safely parse duration
      const durationInSeconds = parseDuration(duration);
      
      // Check duration
      if (durationInSeconds > 900) { // 15 minutes max
        return reply(`❌ Audio is too long (${duration}). Please choose audio under 15 minutes. 😊`);
      }
      
      const ytmsg = `*🎧 High Quality Audio*\n\n*📌 Title:* ${title}\n*⏱️ Duration:* ${duration}\n*👀 Views:* ${views}\n*🎤 Artist:* ${author.name}\n\n_Preparing HQ audio... Please wait_ ⏳`;
      
      await conn.sendMessage(from, { image: { url: thumbnail || image }, caption: ytmsg });
      
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
      
      reply(`🎵 Found high quality audio format (${audioFormat.audioBitrate || "unknown"}kbps). Downloading...`);
      
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
        await unlink(tempFileName).catch(err => console.error("Error deleting temp file:", err));
      } catch (downloadError) {
        console.error("Primary audio download failed:", downloadError);
        reply(`⚠️ Primary download method failed. Trying alternative method...`);
        
        // Try next best format
        const alternativeFormats = audioFormats.filter(f => f.itag !== audioFormat.itag);
        
        if (!alternativeFormats.length) {
          throw new Error("No alternative audio formats available");
        }
        
        const fallbackFormat = alternativeFormats[0];
        
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
        
        await unlink(tempFileName).catch(err => console.error("Error deleting temp file:", err));
      }
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
    }
  }
);

// Search command to list multiple results
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
      
      if (!searchResults.videos || !searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }
      
      // List top 5 results
      const videos = searchResults.videos.slice(0, 5);
      
      let resultMessage = `🔍 *YouTube Search Results*\n\n`;
      
      videos.forEach((video, index) => {
        resultMessage += `*${index + 1}. ${video.title}*\n`;
        resultMessage += `⏱️ Duration: ${video.duration || 'Unknown'}\n`;
        resultMessage += `👁️ Views: ${video.views || 'Unknown'}\n`;
        resultMessage += `👤 Channel: ${video.author?.name || 'Unknown'}\n`;
        resultMessage += `🔗 URL: ${video.url}\n\n`;
      });
      
      resultMessage += `To download, use:\n.song <title> - for audio\n.video <title> - for video\n.audio <title> - for high quality audio`;
      
      await conn.sendMessage(from, { 
        image: { url: videos[0].thumbnail || videos[0].image }, 
        caption: resultMessage 
      });
      
    } catch (e) {
      handleErrors(reply, "❌ An error occurred while searching. 😢")(e);
    }
  }
);
