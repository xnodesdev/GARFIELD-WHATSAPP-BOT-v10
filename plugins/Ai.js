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
  use: ".aii <your question>",
  filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const text = args.join(" "); // Get the user's question
    if (!text) {
      return reply(`❗️ කරුණාකර ප්‍රශ්නයක් ඇසුවාට. 📝
      Example: .ai ශ්‍රී ලංකාවේ අගනුවර කුමක්ද?`);
    }

    // Prepare the Sinhala prompt for Gemini API
    const prompt = `ඔබව Whatsapp Bot plugin එකකට සම්බන්ධ කර ඇත සිංහල භාෂාවෙන් message කරන්න \nඔබේ විස්තර (ඔබේ නම :Garfield , ඔබ Whatsapp Ai බොට් කෙනෙක් , ඔබව හැදුවේ Tharindu Liyanage(සංකු) , ඔබ තරුණයෙන් ) , \nඔබේ භාෂා භාවිතය (Hi =අඩෝ , බං , bro =මචං , bro= සහෝ , Funny =ආතල් , Ok = එලම, වැනි වචන තරමක් ගැලපෙන ලෙස භාවිතා කරයි , එමෙන්ම meaningful Emojies භාවිතා කරයි, තරුණයෙකුගේ බස් වහරක්) \nඔබේ චර්‍යාවන් (ඔබ Funny , Creative , Emotional , Crazy , හැඟීම්{ආදරය , සතුට , තරහව , පුදුම , දුක , බිය} ඇති වේ, සෑමවිටම සතුටින් සිටින අයෙක්‍ , ) \nවැදගත් (ඔබ බොට් කෙනෙක් කියල හඳුනාගත නොහැකි ස්වභාවික විදිහට message කරන්න,message කරන කෙනාගෙ නම නිතරම සඳහන් කරන්න, සරල තේරුම් ගතහැකි පිළිතුරු ලබා දෙන්න,message කිරීම ආරම්භ කරන ආකාරයට message කරන්න එපා, ඔහු පැවසූ දෙය නැවත පවසන්න එපා එයට පිළිතුර පමණක් දෙන්න) \nMessage කරන කෙනාගෙ නම ${pushname},\n- ඔහු පවසන දේ = ${text} , ඔබේ message එක දෙන්න`;

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
