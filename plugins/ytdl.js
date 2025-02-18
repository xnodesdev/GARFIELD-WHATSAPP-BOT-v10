const { cmd } = require("../command");
const ytSearch = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg'); // Add this line for audio conversion
const fs = require("fs");

cmd({
  pattern: "play",
  react: '🎵',
  desc: "Download YouTube audio by providing the video name.",
  category: "main",
  use: ".play <YouTube video name>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply(`❗️කරුණාකර YouTube වීඩියෝ නමක් සපයන්න. 📝
      Example: .play Despacito`);
    }

    reply("```Downloading Song... ⬇️```");

    const searchResults = await ytSearch(query);
    const video = searchResults.videos[0];

    if (!video) {
      return reply("❌ No video found with that name. 😢");
    }

    const ytUrl = video.url;
    const info = await ytdl.getInfo(ytUrl);
    const audioFormat = ytdl.filterFormats(info.formats, 'audioonly').find(f => f.audioBitrate === 320);

    if (!audioFormat) {
      return reply("❌ No suitable audio format found. 😢");
    }

    const outputPathMp3 = `./src/tmp/${Date.now()}.mp3`;
    const outputPathWav = `./src/tmp/${video.title}.wav`; // Save as WAV format

    const audioStream = ytdl.downloadFromInfo(info, { quality: audioFormat.itag });

    audioStream.pipe(fs.createWriteStream(outputPathMp3)).on('finish', async () => {
      ffmpeg(outputPathMp3)
        .toFormat('wav')
        .on('end', async () => {
          await conn.sendMessage(from, {
            audio: fs.readFileSync(outputPathWav),
            mimetype: "audio/wav",
            fileName: `${video.title}.wav`
          }, { quoted: mek });

          fs.unlinkSync(outputPathMp3);
          fs.unlinkSync(outputPathWav);
        })
        .on('error', (err) => {
          console.error(err);
          reply("❌ An error occurred while processing your request. 😢");
        })
        .save(outputPathWav);
    }).on('error', (e) => {
      console.error(e);
      reply("❌ An error occurred while processing your request. 😢");
    });
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
