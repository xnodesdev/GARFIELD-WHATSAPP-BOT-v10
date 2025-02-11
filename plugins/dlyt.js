const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

// temporary songs downloader

cmd({
  pattern: "song",
  react: '🎶',
  desc: "Download audio from YouTube by searching for keywords (using API 2).",
  category: "music",
  use: ".play1 <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a song name or keywords to search for. 📝
      Example: .play 🎵 Mal mitak ,Kasun Kalhara`);
    }

    // Send searching message
    reply("🔍 Garfield is searching for the song... 🎵");

    // Perform YouTube search
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const videoDetails = searchResults.videos[0];
    const { title, timestamp, views, author, url: videoUrl, image } = videoDetails;

    // Message to send with details
    const ytmsg = `🎥 *𝖵𝖨𝖣𝖤𝖮 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
    🎬 *Title* - ${title}
    ⏳ *Duration* - ${timestamp}
    👁️ *Views* - ${views}
    👤 *Author* - ${author.name}
    🔗 *Link* - ${videoUrl}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т`;

    // Send thumbnail and video details
    await conn.sendMessage(from, { 
      image: { url: image },
      caption: ytmsg
    });

    // Call the API to download the audio
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;
    const { data } = await axios.get(apiUrl);

    if (!data.success) {
      return reply(`❌ Failed to fetch audio for "${searchQuery}". 😞`);
    }

    const { download_url } = data.result;

    // Download the audio file
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

    // Send download success message
    reply(`✅ *${title}* has been downloaded successfully! 🎉`);
  } catch (error) {
    console.error("Error while processing request:", error);
    reply("❌ An error occurred while processing your request. 😢");
  }
});