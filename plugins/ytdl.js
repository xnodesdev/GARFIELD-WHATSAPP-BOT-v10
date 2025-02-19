
const { cmd } = require("../command");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);


// Helper function to handle errors
const handleErrors = (reply, errorMsg) => (e) => {
  console.error(e);
  reply(errorMsg);
};


// Download YouTube audio
cmd({
  pattern: "play",
  react: '🎶',
  desc: "Download YouTube audio by searching for keywords.",
  category: "main",
  use: ".audio <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a song name or keywords. 📝\nExample: .audio Despacito`);
    }


    reply("```🔍 Searching for the song... 🎵```");


    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }


    const { title, duration, views, author, url: videoUrl, image } = searchResults.videos[0];
    

    const tempFileName = `./store/${title}.mp3`;


    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.filterFormats(info.formats, 'audioonly').find(f => f.audioBitrate === 128);
    if (!audioFormat) {
      return reply("❌ No suitable audio format found. 😢");
    }


    const audioStream = ytdl.downloadFromInfo(info, { quality: audioFormat.itag });
    await new Promise((resolve, reject) => {
      audioStream.pipe(fs.createWriteStream(tempFileName)).on('finish', resolve).on('error', reject);
    });


    await conn.sendMessage(from, {
      document: await readFile(tempFileName),
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`
    }, { quoted: mek });


    await unlink(tempFileName);
  } catch (e) {
    handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
  }
});


// Download YouTube video
cmd({
  pattern: "ytdl",
  react: '🎥',
  desc: "Download YouTube video by searching for keywords.",
  category: "main",
  use: ".video <video name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply(`❗️ Please provide a video name or keywords. 📝\nExample: .video Despacito`);
    }


    reply("```🔍 Searching for the video... 🎥```");


    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) {
      return reply(`❌ No results found for "${searchQuery}". 😔`);
    }


    const { title, duration, views, author, url: videoUrl, image } = searchResults.videos[0];
    const ytmsg = `🎬 *Title* - ${title}\n🕜 *Duration* - ${duration}\n👁️ *Views* - ${views}\n👤 *Author* - ${author.name}\n🔗 *Link* - ${videoUrl}`;


    const tempFileName = `./store/yt_video_${Date.now()}.mp4`;


    const info = await ytdl.getInfo(videoUrl);
    const videoFormat = ytdl.filterFormats(info.formats, 'videoandaudio').find(f => f.qualityLabel === '360p');
    if (!videoFormat) {
      return reply("❌ No suitable video format found. 😢");
    }


    const videoStream = ytdl.downloadFromInfo(info, { quality: videoFormat.itag });
    await new Promise((resolve, reject) => {
      videoStream.pipe(fs.createWriteStream(tempFileName)).on('finish', resolve).on('error', reject);
    });


    await conn.sendMessage(from, {
      document: await readFile(tempFileName),
      mimetype: "video/mp4",
      fileName: `${title}.mp4`,
      caption: ytmsg
    }, { quoted: mek });


    await unlink(tempFileName);
  } catch (e) {
    handleErrors(reply, "❌ An error occurred while processing your request. 😢")(e);
  }
});
