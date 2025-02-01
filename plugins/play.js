const { cmd } = require("../command");
const ytdl = require("node-yt-dl"); // node-yt-dl මොඩියුලය භාවිතා කිරීම
const yts = require("yt-search"); // YouTube සෙවුම් සඳහා

// වීඩියෝ බාගත කිරීම
cmd({
  pattern: "yt",
  react: '🎥',
  desc: "Download video from YouTube by searching for keywords.",
  category: "main",
  use: ".video <video name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a video name or keywords to search for. 📝
      Example: .video 🎥 Mal mitak ,Kasun Kalhara`);
    }

    // සෙවුම් පණිවිඩය යැවීම
    reply("🔍 Garfield is searching for the video... 🎥");

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

    // node-yt-dl භාවිතා කර වීඩියෝ බාගත කිරීම
    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoStream = ytdl.download(videoInfo, { format: 'mp4', quality: '360p' });

    // වීඩියෝ ගොනුව යැවීම
    await conn.sendMessage(from, {
      video: videoStream,
      mimetype: 'video/mp4',
      caption: `> *${title}*\n> *Quality: 360p*\n> *𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т*`
    }, { quoted: mek });

    // බාගත කිරීම සාර්ථක පණිවිඩය
    reply(`✅ *${title}* has been downloaded successfully! 🎉`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request. 😢");
  }
});

// audio බාගත කිරීම
cmd({
  pattern: "audio",
  react: '🎶',
  desc: "Download audio from YouTube by searching for keywords.",
  category: "main",
  use: ".song <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a song name or keywords to search for. 📝
      Example: .song 🎵 Mal mitak ,Kasun Kalhara`);
    }

    // සෙවුම් පණිවිඩය යැවීම
    reply("🔍 Garfield is searching for the song... 🎵");

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

    // node-yt-dl භාවිතා කර audio බාගත කිරීම
    const audioInfo = await ytdl.getInfo(videoUrl);
    const audioStream = ytdl.download(audioInfo, { format: 'mp3', quality: 'highestaudio' });

    // audio ගොනුව යැවීම
    await conn.sendMessage(from, {
      audio: audioStream,
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      caption: `> *${title}*\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
    }, { quoted: mek });

    // බාගත කිරීම සාර්ථක පණිවිඩය
    reply(`✅ *${title}* has been downloaded successfully! 🎉`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
