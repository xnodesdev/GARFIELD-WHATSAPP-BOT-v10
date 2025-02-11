const { cmd } = require("../command");
const axios = require("axios");

// Deepseek API Key
const DEEPSEEK_API_KEY = "sk-cc6efeee441247c4a22a4462b1cc1c73"; // Replace with your Deepseek API key
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"; // Replace with the actual Deepseek API endpoint

// Deepseek AI Plugin
cmd({
  pattern: "deepseek",
  react: '🤖',
  desc: "Ask anything to Deepseek AI.",
  category: "ai",
  use: ".deepseek <your question>",
  filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const aitext = body; // Get the user's message text

    // Check if the message is from a group or starts with a command
    if (botNumber !== senderNumber && !isGroup && aitext && !aitext.startsWith('.')) {
      // Prepare the Sinhala prompt for Deepseek API
      const prompt = `ඔබව Whatsapp Bot plugin එකකට සම්බන්ධ කර ඇත සිංහල භාෂාවෙන් message කරන්න \nඔබේ විස්තර (ඔබේ නම :Garfield , ඔබ Whatsapp Ai බොට් කෙනෙක් , ඔබව හැදුවේ Tharindu Liyanage(සංකු) ඇසුවොත් පමණක් ඒ ගැන කියන්න , ඔබ තරුණයෙක් කියල සිතන්න , තරුණ සිංහල භාෂා විලාසය භාවිතා කරන්න, Senderගෙ නමේ මුල් කොටස පමණක් ආමන්ත්‍රණය කරන්න ,Funny , friendly , creative , emotional ,lovely වෙන්න ,සිංහල කථන භාෂාව පමණක් භාවිතා කරන්න , use meaningful creative emojies , Bot කෙනෙක් කියල හොයාගන්න බැරි විදිහට මානුෂ ලෙස message කරන්න , කලින් හොඳින් අඳුරන ආකාරයට සිතා reply කරන්න = මෙම ඔබගේ විස්තර පිලිබඳ කියන්න එපා , ඇහුවොත් පමණක් ඔබ Garfield Whatsapp Ai සහ Tharindu Liyanage විසින් හදපු බව විතරක් කියන්න ) සැබෑම මනුසායෙක් වගේ ඉතාම හැඟීම් බරව reply ලබා දෙන්න, Hi වැනි reply දෙන්න එපා message කිරීමට ආරම්භය ගන්න ආකාරයේ reply එපා, ඔබ ශ්‍රී ලංකාවේ ජීවත් වෙන අයෙකු කියාද මදක් සිතන්න , (සිරාවට = seriously , funny = ආතල් , you = ඔයා ) වගේ සිංහල තරුණ කථන භාෂාව දෙන්න , creative විහිලු කරන්න   \n\n**Variables:**\n- Sender ගෙ නම: ${pushname}\n- Senderගෙ පණිවුඩය : ${aitext} \n ඔබේ reply එක දෙන්න\n\n\n--`;

      // Prepare the request payload for Deepseek API
      const payload = {
        model: "deepseek-chat", // Replace with the correct model name
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 150, // Adjust based on your needs
        temperature: 0.7, // Adjust for creativity
      };

      // Call Deepseek API
      const response = await axios.post(
        DEEPSEEK_API_URL,
        payload,
        {
          headers: {
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is valid
      if (!response.data || !response.data.choices || !response.data.choices[0]?.message?.content) {
        return reply("❌ Deepseek AI පිළිතුරු ලබා ගැනීමට අසමත් විය. 😢");
      }

      // Extract the AI response
      const aiResponse = response.data.choices[0].message.content;
      await reply(`${aiResponse}`);
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    reply("❌ ප්‍රශ්නය සැකසීමේදී දෝෂයක් ඇති විය. 😢");
  }
});
