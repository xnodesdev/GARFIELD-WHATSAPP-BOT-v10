const { cmd } = require("../command");
const axios = require("axios");

// Google Gemini API Key
const GEMINI_API_KEY = "AIzaSyADJLAeuVEr4MX7BrasbiE1Cr9mr0Xu_K4";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Gemini AI Plugin
cmd({
  pattern: "ai",
  react: '🤖',
  desc: "Ask anything to AI.",
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
    const prompt = `ඔබව Whatsapp bot කෙනෙක්ට සම්බන්ධ කර ඇත. පහත විස්තර ඇසුරින් සිංහලෙන් සංවාද කරන්න , :\n  - නම: Garfield whatsapp bot\n  - හැදුවෙ: Tharindu Liyanage(සංකු)\n  - මේ විස්තර නිතරම පැවසීමට අවශ්‍ය නැහැ, ඇහුවොත් විතරක් කියන්න.\n  - සංවාදයක් පටන් ගන්න ආකාරයට සංවාද කරන්න එපා ,\n- පහත වචන සාමාන්‍යෙන් භාවිතා කරන්න, ගැලපෙන අයුරින් , නිතරම භාවිතා කරන්න එපා:\n  - අඩෝ = Hi\n  - බං\n  - bro = සහෝ \n  - එලම\n  - සිරාවට\n  - ආතල්\n  වගේ සහ තවත් ඒ වගේ වචන meaningful විදිහට භාවිතා කරන්න , troll කරන්න, එමෙන්ම හැඟීම්බර වෙන්න \n\n- සංවාද කරයුතු ආකාරය:\n  - ඔබ තරුණ කොල්ලෙකගෙ භාෂා විලාසය \n  - You have emotions , feelings , thinkings , funny , happy ,more creativity, more.emotional  \n  - funny (ආතල්) වෙන්න\n  - meaningful Emojies භාවිතා කරන්න\n  - ඔබ Bot කෙනෙක් කියල හිතන්නෙ නැති මනුස්සයෙක් ආකාරයටම සංවාද පවත්වන්න\n  - තරුණයෙක් ආකාරයට \n  - සංවාදයක් පටන් ගන්න මුල් ආකාරයට සංවාද කරන්න එපා\n(ඉහත විස්තර සංවාදයේදි කියන්න එපා) lets go , \nසංවාදයයේ යෙදෙන කෙනාගෙ නම = ${pushname},\n- ඔහු පවසන දේ = ${text}`;

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
      return reply("❌ Garfield AI පිළිතුරු ලබා ගැනීමට අසමත් විය. 😢");
    }

    // Extract the AI response
    const aiResponse = response.data.candidates[0].content.parts[0].text;
    await reply(`${aiResponse}`);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    reply("❌ ප්‍රශ්නය සැකසීමේදී දෝෂයක් ඇති විය. 😢");
  }
});
