const { cmd } = require("../command"); // Custom command handler
const { downloadYouTubeMedia } = require("../lib/yt"); // Import the download function
const yts = require("yt-search"); // For searching YouTube videos

cmd({
  pattern: "song", // Command name
  react: '🎶', // Emoji reaction
  desc: "Download YouTube audio by searching for keywords.", // Description
  category: "main", // Category
  use: ".ytaudio <search query>", // Usage example
  filename: __filename // Current file name
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" "); // Get the search query from the arguments
    if (!query) {
      return reply(`❗️ Please provide a search query. 📝
      Example: .ytaudio Despacito`);
    }

    reply("```🔍 Searching for the audio... 🎵```");

    // Search for the video using yt-search
    const searchResults = await yts(query);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${query}". 😔`);
    }

    const videoDetails = searchResults.videos[0]; // Get the first search result
    const { title, duration, author, url, thumbnail } = videoDetails;

    // Send the thumbnail and video details
    await conn.sendMessage(from, {
      image: { url: thumbnail }, // Thumbnail image
      caption: `🎶 *Title*: ${title}
🕜 *Duration*: ${duration.timestamp}
👤 *Author*: ${author.name}
🔗 *Link*: ${url}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1`
    }, { quoted: mek });

    // Download the audio using rahad-all-downloader
    const { filePath: audioFilePath } = await downloadYouTubeMedia(url, './downloads', {
      extractAudio: true // Extract audio only
    });

    // Send the audio to the user
    await conn.sendMessage(from, {
      audio: fs.readFileSync(audioFilePath),
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`
    }, { quoted: mek });

    // Delete the temporary audio file
    fs.unlinkSync(audioFilePath);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
