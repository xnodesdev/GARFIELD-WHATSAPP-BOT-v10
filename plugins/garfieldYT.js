import { yta, ytv } from '../lib/y2.js';
import { cmd } from '../command';

cmd({
  pattern: "ytmp3",
  react: '🎶',
  desc: "Download audio from YouTube by searching for keywords.",
  category: "music",
  use: ".play <song name or YouTube link>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply(`*Please provide a song name or YouTube link to search for.*
      Example: .play Mal mitak, Kasun Kalhara`);
    }

    reply("`Garfield is searching for the song... 🎵`");

    const audioDetails = await yta(query);
    if (!audioDetails) {
      return reply(`❌ No results found for "${query}".`);
    }

    const { title, link } = audioDetails;

    // Send the audio file
    await conn.sendMessage(from, {
      audio: { url: link },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

    reply(`✅ *${title}* has been downloaded successfully!`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});

cmd({
  pattern: "ytmp4",
  react: '🎥',
  desc: "Download video from YouTube by searching for keywords.",
  category: "video",
  use: ".video <video name or YouTube link>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply(`*Please provide a video name or YouTube link to search for.*
      Example: .video Mal mitak, Kasun Kalhara`);
    }

    reply("`Garfield is searching for the video... 🎥`");

    const videoDetails = await ytv(query);
    if (!videoDetails) {
      return reply(`❌ No results found for "${query}".`);
    }

    const { title, link } = videoDetails;

    // Send the video file
    await conn.sendMessage(from, {
      video: { url: link },
      caption: title
    }, { quoted: mek });

    reply(`✅ *${title}* has been downloaded successfully!`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});
