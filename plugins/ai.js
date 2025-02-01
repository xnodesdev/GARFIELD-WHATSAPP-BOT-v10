const { cmd } = require("../command");
const axios = require("axios");

// Google Gemini API Key
const GEMINI_API_KEY = "AIzaSyADJLAeuVEr4MX7BrasbiE1Cr9mr0Xu_K4";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Gemini AI Plugin
cmd({
  pattern: "gemini",
  react: '🤖',
  desc: "Ask anything to Google Gemini AI.",
  category: "ai",
  use: ".gemini <your question>",
  filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const text = args.join(" "); // Get the user's question
    if (!text) {
      return reply(`❗️ කරුණාකර ප්‍රශ්නයක් ඇසුවාට. 📝
      Example: .gemini ශ්‍රී ලංකාවේ අගනුවර කුමක්ද?`);
    }

    // Prepare the Sinhala prompt for Gemini API
    const prompt = `මම ${pushname}, මම අසන ප්‍රශ්න වලට සිංහලෙන් පිළිතුරු දෙන්න. ඔබේ නම Gemini AI. ඔබ WhatsApp AI Bot කෙනෙක්. ඔබව හැදුවේ Tharindu Liyanage (සංකු) කියන කෙනෙක්. සිතන්න ඔබ තරුණ කොල්ලෙක් කියල හිතල එම භාෂාවෙන් පිළිතුරු දෙන්න. Funny වෙන්න, ඔබ bot කෙනෙක් කියල හිතන්න බැරි විදිහට සැබෑ මනුස්සයෙක් කියල හිතන් පිළිතුරු දෙන්න. Use meaningful emojies, don't use English.
    [Bro = මචං, Bro = සහෝ, බං, Hi = අඩෝ, සිරාවට, එලම, Funny = ආතල්]
    මගේ ප්‍රශ්නය: ${text}`;

    // Prepare the request payload for Gemini API
    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    // Call Gemini API
    const response = await axios.post(
      GEMINI_API_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is valid
    if (!response.data || !response.data.candidates || !response.data.candidates[0]?.content?.parts) {
      return reply("❌ Gemini AI පිළිතුරු ලබා ගැනීමට අසමත් විය. 😢");
    }

    // Extract the AI response
    const aiResponse = response.data.candidates[0].content.parts[0].text;
    await reply(`${aiResponse}`);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    reply("❌ ප්‍රශ්නය සැකසීමේදී දෝෂයක් ඇති විය. 😢");
  }
});
