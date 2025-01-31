const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 });  // Cache results for 1 hour

cmd({
  pattern: "play",
  react: '🎶',
  desc: "Download audio from YouTube by searching for keywords (using API 2).",
  category: "music",
  use: ".play1 <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`*Please provide a song name or keywords to search for.*
      Example .play Mal mitak ,Kasun Kalhara`);
    }

    reply("`Garfield is searching for the song... 🎵`");

    // Check cache for search results
    let searchResults = cache.get(searchQuery);
    if (!searchResults) {
      searchResults = await yts(searchQuery);
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return reply(`❌ No results found for "${searchQuery}".`);
      }
      cache.set(searchQuery, searchResults);  // Cache search results
    }

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;

    // Check cache for download URL
    let audioDetails = cache.get(videoUrl);
    if (!audioDetails) {
      const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;
      const response = await axios.get(apiUrl);
      if (!response.data.success) {
        return reply(`❌ Failed to fetch audio for "${searchQuery}".`);
      }
      audioDetails = response.data.result;
      cache.set(videoUrl, audioDetails);  // Cache audio details
    }

    const { title, download_url } = audioDetails;

    // Send the audio file
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

    reply(`✅ *${title}* has been downloaded successfully!`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});