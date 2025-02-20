const { cmd } = require("../command"); // Custom command handler
const yts = require("yt-search"); // For searching YouTube videos
const { alldl } = require('rahad-all-downloader'); // For downloading YouTube media
const fs = require("fs"); // For file system operations
const path = require("path"); // For handling file paths

cmd({
  pattern: "video", // Command name
  react: '🎥', // Emoji reaction
  desc: "Download YouTube video by searching for keywords or using a URL.", // Description
  category: "main", // Category
  use: ".ytvideo <video name or URL>", // Usage example
  filename: __filename // Current file name
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" "); // Join arguments to form the search query
    if (!query) {
      return reply(`❗️ Please provide a video name or URL. 📝
      Example: .ytvideo Despacito`);
    }

    reply("```🔍 Searching for the video... 🎥```");

    let videoUrl = query;

    // If the input is not a URL, search for the video
    if (!query.startsWith("http")) {
      const searchResults = await yts(query);
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return reply(`❌ No results found for "${query}". 😔`);
      }
      videoUrl = searchResults.videos[0].url; // Use the first search result URL
    }

    // Download the video
    const result = await alldl(videoUrl);
    if (!result || !result.data || !result.data.videoUrl) {
      return reply("❌ Failed to fetch video URL. 😢");
    }

    const videoResponse = await fetch(result.data.videoUrl);
    const videoArrayBuffer = await videoResponse.arrayBuffer();
    const videoBuffer = Buffer.from(videoArrayBuffer);

    // Save the video to a temporary file
    const tempFileName = `./store/yt_video_${Date.now()}.mp4`;
    fs.writeFileSync(tempFileName, videoBuffer);

    // Send the video to the user
    await conn.sendMessage(from, {
      document: fs.readFileSync(tempFileName),
      mimetype: "video/mp4",
      caption: `🎬 *Title*: ${result.data.title}
🕜 *Duration*: ${result.data.duration}
👁️ *Views*: ${result.data.views}
👤 *Author*: ${result.data.author}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1`
    }, { quoted: mek });

    // Delete the temporary file
    fs.unlinkSync(tempFileName);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
