const { cmd } = require("../command");
const { facebook } = require("another-fb-video-downloader");
const axios = require("axios");
const fs = require("fs");

cmd({
  pattern: "fb",
  react: '🎥',
  desc: "Download Facebook video by providing the video URL.",
  category: "main",
  use: ".fbdl <Facebook video URL>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl) {
      return reply(`❗️ කරුණාකර Facebook වීඩියෝ URL එකක් සපයන්න. 📝
      Example: .fb https://www.facebook.com/example/video/123456789/`);
    }

    reply("`🔍 Downloading video... 🎥`");

    const videoUrl = await facebook(fbUrl, false); 

    reply("`📤 Uploading video...`");

    const response = await axios({
      url: videoUrl,
      responseType: 'stream',
    });

    const tempFileName = `./src/tmp/fb_video_${Date.now()}.mp4`;
    const writer = fs.createWriteStream(tempFileName);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    await conn.sendMessage(from, {
      video: fs.readFileSync(tempFileName),
      mimetype: "video/mp4",
      caption: `📁 *File Name* : 82837.mp4 
🎬 *Format*: mp4
🌍 *Video Source* : Facebook 
> 𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т v10.1 Facebook Video downloader`
    }, { quoted: mek });

    fs.unlinkSync(tempFileName);
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request. 😢");
  }
});
//copy code with credit @Tharindu Liyanage
