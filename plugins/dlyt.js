const { cmd } = require("../command");
const ytSearch = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const fs = require("fs");

cmd({
  pattern: "ytmp3",
  react: '🎵',
  desc: "Download YouTube audio by providing the video name.",
  category: "main",
  use: ".ytmp3 <YouTube video name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply(`❗️කරුණාකර YouTube වීඩියෝ නමක් සපයන්න. 📝
      Example: .ytmp3 Despacito`);
    }

    reply("```🔍 Searching song... 🎶```");

    const searchResults = await ytSearch(query);
    const video = searchResults.videos[0];

    if (!video) {
      return reply("❌ No video found with that name. 😢");
    }

    const ytUrl = video.url;
    const info = await ytdl.getInfo(ytUrl);
    const audioFormat = ytdl.filterFormats(info.formats, 'audioonly').find(f => f.audioBitrate === 128);
    const title = video.title;
    const duration = video.timestamp;
    const views = video.views;
    const author = video.author.name;
    const link = video.url;

    if (!audioFormat) {
      return reply("❌ No suitable audio format found. 😢");
    }

    const outputPath = `./src/tmp/${title}.mp3`;
    const audioStream = ytdl.downloadFromInfo(info, { quality: audioFormat.itag });

    audioStream.pipe(fs.createWriteStream(outputPath)).on('finish', async () => {
      await conn.sendMessage(from, {
        audio: fs.readFileSync(outputPath),
        mimetype: "audio/mp3",
        caption: `*🎶 Song Name* - ${title}
🕜 *Duration* - ${duration}
📻 *Listerners* - ${views}
 *🎙️ Artist* - ${author}
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Тv10.1
> File Name ${title}.mp3`
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
