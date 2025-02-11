const { cmd } = require("../command");
const yts = require("yt-search"); // YouTube සෙවුම් සඳහා
const { ytv, yta } = require("../lib/y2.js"); // yt2.js එක භාවිතා කිරීම

// YouTube වීඩියෝ බාගත කිරීම
cmd({
  pattern: "ytmp",
  react: '🎥',
  desc: "Download YouTube video by searching for keywords.",
  category: "main",
  use: ".video <video name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ කරුණාකර වීඩියෝ නමක් හෝ සෙවුම් වචන සපයන්න. 📝
      Example: .video Mal mitak`);
    }

    // සෙවුම් පණිවිඩය යැවීම
    reply("🔍 Searching for the video... 🎥");

    // YouTube සෙවුම් කිරීම
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const videoDetails = searchResults.videos[0];
    const { title, timestamp, views, author, url: videoUrl, image } = videoDetails;

    // වීඩියෝ තොරතුරු සමඟ පණිවිඩය
    let ytmsg = `🎥 *𝖵𝖨𝖣𝖤𝖮 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
    🎬 *Title* - ${title}
    ⏳ *Duration* - ${timestamp}
    👁️ *Views* - ${views}
    👤 *Author* - ${author.name}
    🔗 *Link* - ${videoUrl}
    > 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т`;

    // තම්බ්නේල් සහ වීඩියෝ තොරතුරු යැවීම
    await conn.sendMessage(from, { 
      image: { url: image },
      caption: ytmsg
    });

    // yt2.js භාවිතා කර වීඩියෝ බාගත කිරීම
    const videoData = await ytv(videoUrl);
    if (!videoData.link) {
      return reply("❌ Failed to get the video download link. 😞");
    }

    // වීඩියෝ ගොනුව යැවීම
    await conn.sendMessage(from, {
      video: { url: videoData.link },
      mimetype: "video/mp4",
      caption: `> *${title}*\n> *Quality: ${videoData.quality}*\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
    }, { quoted: mek });

    // බාගත කිරීම සාර්ථක පණිවිඩය
    reply(`✅ *${title}* has been downloaded successfully! 🎉`);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});

// YouTube audio බාගත කිරීම
cmd({
  pattern: "ytms",
  react: '🎶',
  desc: "Download YouTube audio by searching for keywords.",
  category: "main",
  use: ".song <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ කරුණාකර ගීතයක් හෝ සෙවුම් වචන සපයන්න. 📝
      Example: .song Kasun Kalhara`);
    }

    // සෙවුම් පණිවිඩය යැවීම
    reply("🔍 Searching for the song... 🎵");

    // YouTube සෙවුම් කිරීම
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const videoDetails = searchResults.videos[0];
    const { title, timestamp, views, author, url: videoUrl, image } = videoDetails;

    // audio තොරතුරු සමඟ පණිවිඩය
    let ytmsg = `🎵 *𝖬𝖴𝖲𝖨𝖢 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱*
    🎬 *Title* - ${title}
    ⏳ *Duration* - ${timestamp}
    👁️ *Views* - ${views}
    👤 *Author* - ${author.name}
    🔗 *Link* - ${videoUrl}
    > 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т`;

    // තම්බ්නේල් සහ audio තොරතුරු යැවීම
    await conn.sendMessage(from, { 
      image: { url: image },
      caption: ytmsg
    });

    // yt2.js භාවිතා කර audio බාගත කිරීම
    const audioData = await yta(videoUrl);
    if (!audioData.link) {
      return reply("❌ Failed to get the audio download link. 😞");
    }

    // audio ගොනුව යැවීම
    await conn.sendMessage(from, {
      audio: { url: audioData.link },
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`,
      caption: `> *${title}*\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
    }, { quoted: mek });

    // බාගත කිරීම සාර්ථක පණිවිඩය
    reply(`✅ *${title}* has been downloaded successfully! 🎉`);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
