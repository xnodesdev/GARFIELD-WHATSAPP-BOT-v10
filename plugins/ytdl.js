const { cmd } = require("../command");
const axios = require("axios");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);

const unlink = promisify(fs.unlink);

// Available quality options
const audioQualities = [64, 96, 128, 192, 256, 320, 1000, 1411];
const videoQualities = [360, 480, 720, 1080, 1440];

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Optimized convert function with timeout
async function convert(id, quality) {
  try {
    const response = await axios.get(`https://ytdl.vreden.web.id/convert.php/${id}/${quality}`, { timeout: 10000 });
    let download;
    const startTime = Date.now();
    do {
      if (Date.now() - startTime > 15000) throw new Error("Conversion timeout");
      download = await axios.get(`https://ytdl.vreden.web.id/progress.php/${response.data.convert}`, { timeout: 5000 });
      if (download.data.status === "Error") {
        return { status: false, message: "Conversion error" };
      }
    } while (download.data.status !== "Finished");

    return {
      status: true,
      quality: `${quality}${audioQualities.includes(quality) ? "kbps" : "p"}`,
      url: download.data.url,
      filename: `${response.data.title} (${quality}${audioQualities.includes(quality) ? "kbps).mp3" : "p).mp4"}`,
      title: response.data.title,
    };
  } catch (error) {
    console.error("Conversion error:", error);
    return { status: false, message: "Failed to convert file" };
  }
}

// Stream file directly from URL
const streamFile = async (url, destination) => {
  const response = await axios.get(url, { responseType: "stream", timeout: 10000 });
  await pipeline(response.data, destination);
};

// Handle errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  reply(`${errorMsg}: ${e.message}`);
};

// Download YouTube audio
cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Fast search and download YouTube audio.",
    category: "main",
    use: ".song <song name>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(`❗️ Please provide a song name. 📝\nExample: .song Despacito`);
      }

      reply("```🔍 Searching and downloading song... 🎵```");

      // Parallel search and initial metadata
      const [searchResults] = await Promise.all([yts(searchQuery)]);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const video = searchResults.videos[0];
      const videoId = getYouTubeVideoId(video.url);
      if (!videoId) {
        return reply(`❌ Invalid YouTube URL extracted. 😔`);
      }

      // Send basic metadata immediately
      const ytmsg = `*🎶 Song Name* - ${video.title}\n*🕜 Duration* - ${video.duration.timestamp}\n*📻 Views* - ${video.views}\n*🎙️ Artist* - ${video.author.name}`;
      await conn.sendMessage(from, { image: { url: video.thumbnail }, caption: ytmsg });

      // Convert and download audio (320kbps)
      const audioData = await convert(videoId, 128);
      if (!audioData.status) {
        return reply(`❌ Failed to fetch audio: ${audioData.message}. 😢`);
      }

      // Stream audio directly to message
      const audioStream = await axios.get(audioData.url, { responseType: "stream", timeout: 10000 });
      await conn.sendMessage(
        from,
        {
          audio: audioStream.data,
          mimetype: "audio/mpeg",
          fileName: audioData.filename,
        },
        { quoted: mek }
      );
    } catch (e) {
      handleErrors(reply, "❌ Error processing your audio request")(e);
    }
  }
);

// Download YouTube video
cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Fast search and download YouTube video.",
    category: "main",
    use: ".video <video name>",
    filename: __filename,
  },
  async (conn, mek, msg, { from, args, reply }) => {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return reply(`❗️ Please provide a video name. 📝\nExample: .video Despacito`);
      }

      reply("```🔍 Searching and downloading video... 🎥```");

      // Parallel search and initial metadata
      const [searchResults] = await Promise.all([yts(searchQuery)]);
      if (!searchResults.videos.length) {
        return reply(`❌ No results found for "${searchQuery}". 😔`);
      }

      const video = searchResults.videos[0];
      const videoId = getYouTubeVideoId(video.url);
      if (!videoId) {
        return reply(`❌ Invalid YouTube URL extracted. 😔`);
      }

      // Send basic metadata immediately
      const ytmsg = `*🎬 Title* - ${video.title}\n*🕜 Duration* - ${video.duration.timestamp}\n*👁️ Views* - ${video.views}\n*👤 Author* - ${video.author.name}\n*🔗 Link* - ${video.url}`;
      // No thumbnail to save time (optional: keep if desired)

      // Convert and download video (1080p)
      const videoData = await convert(videoId, 360);
      if (!videoData.status) {
        return reply(`❌ Failed to fetch video: ${videoData.message}. 😢`);
      }

      // Stream video directly to message
      const tempFileName = `./store/yt_video_${Date.now()}.mp4`;
      await streamFile(videoData.url, fs.createWriteStream(tempFileName));
      await conn.sendMessage(
        from,
        {
          document: fs.createReadStream(tempFileName),
          mimetype: "video/mp4",
          caption: ytmsg,
        },
        { quoted: mek }
      );

      // Clean up
      await unlink(tempFileName);
    } catch (e) {
      handleErrors(reply, "❌ Error processing your video request")(e);
    }
  }
);
