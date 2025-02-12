const { cmd } = require("../command");
const ytdl = require("ytdl-core"); // YouTube වීඩියෝ බාගත කිරීම සඳහා
const yts = require("yt-search"); // YouTube සෙවුම් සඳහා
const fs = require("fs"); // ගොනු කළමනාකරණය සඳහා

// YouTube වීඩියෝ බාගත කිරීම
cmd({
  pattern: "ytt",
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
    reply("*🔍 Searching for the video... 🎥*");

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

    // අහඹු ගොනු නාමයක් ජනනය කිරීම
    const randomName = `${Math.floor(Math.random() * 10000)}.mp4`;

    // වීඩියෝ බාගත කිරීම
    const stream = ytdl(videoUrl, { filter: (info) => info.itag == 22 || info.itag == 18 })
      .pipe(fs.createWriteStream(`./data/${randomName}`));

    // බාගත කිරීමේ පණිවිඩය යැවීම
    reply("*🔍 Downloading the video... 🎥*");

    await new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', resolve);
    });

    // ගොනුවේ ප්‍රමාණය පරීක්ෂා කිරීම
    const stats = fs.statSync(`./data/${randomName}`);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMegabytes <= 999) {
      // වීඩියෝ ගොනුව යැවීම
      await conn.sendMessage(from, {
        video: fs.readFileSync(`./data/${randomName}`),
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4'
      }, { quoted: mek });

      // බාගත කිරීම සාර්ථක පණිවිඩය
      reply(`✅ *${title}* has been downloaded successfully! 🎉`);
    } else {
      reply(`❌ වීඩියෝවේ ප්‍රමාණය 1000MB ඉක්මවා ඇත. එය බාගත කිරීමට නොහැකි විය. 😢`);
    }

    // ගොනුව මකා දැමීම
    fs.unlinkSync(`./data/${randomName}`);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
