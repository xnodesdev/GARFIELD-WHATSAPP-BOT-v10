const { cmd } = require("../command");
const ytdl = require("garfield-ytdl");
const yts = require("yt-search"); // YouTube සෙවුම් සඳහා
const fs = require("fs"); // ගොනු කළමනාකරණය සඳහා

// YouTube audio බාගත කිරීම
cmd({
  pattern: "play",
  react: '🎶',
  desc: "Download YouTube audio by searching for keywords.",
  category: "main",
  use: ".audiodl <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ කරුණාකර ගීතයක් හෝ සෙවුම් වචන සපයන්න. 📝
      Example: .audiodl Kasun Kalhara`);
    }

    // සෙවුම් පණිවිඩය යැවීම
    reply("```🔍 Searching for the song... 🎵```");

    // YouTube සෙවුම් කිරීම
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const videoDetails = searchResults.videos[0];
    const { title, duration, timestamp, views, author, url: videoUrl, image } = videoDetails;

    // audio තොරතුරු සමඟ පණිවිඩය
    let ytmsg = `*🎶 Song Name* - ${title}
*🕜 Duration* - ${duration}
*📻 Listerners* - ${views}
*🎙️ Artist* - ${author}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1
> File Name ${title}.mp3`;

    // තම්බ්නේල් සහ audio තොරතුරු යැවීම
    await conn.sendMessage(from, { 
      image: { url: image },
      caption: ytmsg
    });

    // අහඹු ගොනු නාමයක් ජනනය කිරීම
    const tempFileName = `./store/yt_audio_${Date.now()}.mp3`;

    // audio බාගත කිරීම
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.filterFormats(info.formats, 'audioonly');
    const audioFormat = format.find(f => f.audioBitrate === 320);

    if (!audioFormat) {
      return reply("❌ No suitable audio format found. 😢");
    }

    const audioStream = ytdl.downloadFromInfo(info, { quality: audioFormat.itag })
      .pipe(fs.createWriteStream(tempFileName));

    await new Promise((resolve, reject) => {
      audioStream.on('finish', resolve);
      audioStream.on('error', reject);
    });

    // audio ගොනුව යැවීම
    await conn.sendMessage(from, {
      audio: fs.readFileSync(tempFileName),
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`,
      caption: `> *${title}*\n> *𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т*`
    }, { quoted: mek });

    // බාගත කිරීම සාර්ථක පණිවිඩය

    // තාවකාලික ගොනුව මකා දැමීම
    fs.unlinkSync(tempFileName);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});

// YouTube වීඩියෝ බාගත කිරීම
cmd({
  pattern: "ytdl",
  react: '🎥',
  desc: "Download YouTube video by searching for keywords.",
  category: "main",
  use: ".videodl <video name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ කරුණාකර වීඩියෝ නමක් හෝ සෙවුම් වචන සපයන්න. 📝
      Example: .videodl Mal mitak`);
    }

    // සෙවුම් පණිවිඩය යැවීම
    reply("```🔍 Searching for the video... 🎥```");

    // YouTube සෙවුම් කිරීම
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }

    const videoDetails = searchResults.videos[0];
    const { title, duration, timestamp, views, author, url: videoUrl, image } = videoDetails;

    // වීඩියෝ තොරතුරු සමඟ පණිවිඩය
    let ytmsg = `🎬 *Title* - ${title}
🕜 *Duration* - ${duration}
👁️ *Views* - ${views}
👤 *Author* - ${author}
🔗 *Link* - ${link}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1
> File Name ${title}.mp4`;

    // තම්බ්නේල් සහ වීඩියෝ තොරතුරු යැවීම

    // අහඹු ගොනු නාමයක් ජනනය කිරීම
    const tempFileName = `./store/yt_video_${Date.now()}.mp4`;

    // වීඩියෝ බාගත කිරීම
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.filterFormats(info.formats, 'videoandaudio');
    const videoFormat = format.find(f => f.qualityLabel === '360p');

    if (!videoFormat) {
      return reply("❌ No suitable video format found. 😢");
    }

    const videoStream = ytdl.downloadFromInfo(info, { quality: videoFormat.itag })
      .pipe(fs.createWriteStream(tempFileName));

    await new Promise((resolve, reject) => {
      videoStream.on('finish', resolve);
      videoStream.on('error', reject);
    });

    // වීඩියෝ ගොනුව යැවීම
    await conn.sendMessage(from, {
      video: fs.readFileSync(tempFileName),
      mimetype: "video/mp4",
      caption: ytmsg
    }, { quoted: mek });

    // බාගත කිරීම සාර්ථක පණිවිඩය

    // තාවකාලික ගොනුව මකා දැමීම
    fs.unlinkSync(tempFileName);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
