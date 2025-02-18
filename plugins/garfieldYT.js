const { cmd } = require("../command");
const ytSearch = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const fs = require("fs");

cmd({
  pattern: "video",
  react: '🎥',
  desc: "Download YouTube video by providing the video name.",
  category: "main",
  use: ".ytmp4 <YouTube video name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply(`❗️කරුණාකර YouTube වීඩියෝ නමක් සපයන්න. 📝
      Example: .video Despacito`);
    }

    reply("```🔍 Searching video... 🎥```");

    const searchResults = await ytSearch(query);
    const video = searchResults.videos[0];

    if (!video) {
      return reply("❌ No video found with that name. 😢");
    }

    const ytUrl = video.url;
    const info = await ytdl.getInfo(ytUrl);
    const videoFormat = ytdl.filterFormats(info.formats, 'videoandaudio').find(f => f.qualityLabel === '360p');
    const title = video.title;
    const duration = video.timestamp;
    const views = video.views;
    const author = video.author.name;
    const link = video.url;

    if (!videoFormat) {
      return reply("❌ No suitable video format found. 😢");
    }

    const outputPath = `./src/tmp/yt_video_${Date.now()}.mp4`;
    const videoStream = ytdl.downloadFromInfo(info, { quality: videoFormat.itag });

    videoStream.pipe(fs.createWriteStream(outputPath)).on('finish', async () => {
      await conn.sendMessage(from, {
        video: fs.readFileSync(outputPath),
        mimetype: "video/mp4",
        caption: `🎬 *Title* - ${title}
🕜 *Duration* - ${duration}
👁️ *Views* - ${views}
👤 *Author* - ${author}
🔗 *Link* - ${link}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1
> File Name ${title}.mp4`
      }, { quoted: mek });

      fs.unlinkSync(outputPath);
    }).on('error', (e) => {
      console.error(e);
      reply("❌ An error occurred while processing your request. 😢");
    });
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
