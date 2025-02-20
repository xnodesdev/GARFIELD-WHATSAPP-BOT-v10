const { cmd } = require("../command"); // Custom command handler
const { downloadYouTubeMedia } = require("../lib/yt"); // Import the download function
const yts = require("yt-search"); // For searching YouTube videos

cmd({
  pattern: "video", // Command name
  react: '🎥', // Emoji reaction
  desc: "Download YouTube video by searching for keywords.", // Description
  category: "main", // Category
  use: ".ytvideo <search query>", // Usage example
  filename: __filename // Current file name
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" "); // Get the search query from the arguments
    if (!query) {
      return reply(`❗️ Please provide a search query. 📝
      Example: .ytvideo Despacito`);
    }

    reply("```🔍 Searching for the video... 🎥```");

    // Search for the video using yt-search
    const searchResults = await yts(query);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${query}". 😔`);
    }

    const videoDetails = searchResults.videos[0]; // Get the first search result
    const { title, duration, views, author, url, thumbnail } = videoDetails;

   

    // Download the video using rahad-all-downloader
    const { filePath: videoFilePath } = await downloadYouTubeMedia(url, './downloads', {
      extractAudio: false // Download video only
    });

    // Send the video to the user
    await conn.sendMessage(from, {
      document: fs.readFileSync(videoFilePath),
      mimetype: "video/mp4",
      caption: `🎬 *Title*: ${title}
🕜 *Duration*: ${duration.timestamp}
👁️ *Views*: ${views}
👤 *Author*: ${author.name}
🔗 *Link*: ${url}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1`
    }, { quoted: mek });

    // Delete the temporary video file
    fs.unlinkSync(videoFilePath);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
