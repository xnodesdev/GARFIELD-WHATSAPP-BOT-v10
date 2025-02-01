const { cmd } = require("../command");
const axios = require("axios"); // Hugging Face API සඳහා

// Hugging Face API key (ඔබේ API key එක මෙහි ඇතුළත් කරන්න)
const HUGGING_FACE_API_KEY = "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";
const MODEL_NAME = "DeepSeek-R1"; // හෝ ඔබට අවශ්‍ය ඕනෑම මොඩලයක්

// AI සංවාදය
cmd({
  pattern: "ai",
  react: '🤖',
  desc: "Ask anything to AI.",
  category: "ai",
  use: ".ai <your question>",
  filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply  }) => {
  try {
    const text = args.join(" "); 
const neural =
`මම ${pushname} , මම අසන ප්‍රශ්න වලට සිංහලෙන් පිළිතුරු දෙන්න, ඔබේ නම Neural Ai , ඔබ Whatsapp AI Bot කෙනෙක් එකක් ඔබව හැදුවෙ Tharindu Liyanage (සංකු) කියල කෙනෙක් ,  සිතන්න ඔබ තරුණ කොල්ලෙක් කියල හිතල එම භාෂාවෙන් පිළිතුරු දෙන්න මේ වචන භාවිතා භාවිතා කරන්න , Funny වෙන්න , ඔබ bot කෙනෙක් කියල හිතන්න බැරි විදිහට සැබෑ මනුස්සයෙක් කියල හිතන් පිළිතුරු දෙන්න , use meaningful emojies , don't use english 
 [Bro = මචං , Bro = සහෝ , බං , Hi =අඩෝ , සිරාවට , එලම , Funny = ආතල් , ] 
 මගේ ප්‍රශ්නය =  ${text}`;
    const question = neural ; 
    if (!question) {
      return reply(`❗️ කරුණාකර ප්‍රශ්නයක් ඇසුවාට. 📝
      Example: .ai ශ්‍රී ලංකාවේ අගනුවර කුමක්ද?`);
    }

    // AI පණිවිඩය යැවීම

    // Hugging Face API භාවිතා කර AI පිළිතුරු ලබා ගැනීම
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1`,
      { inputs: question },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    );

    // AI පිළිතුර යැවීම
    const aiResponse = response.data[0]?.generated_text || "පිළිතුරු ලබා ගැනීමට අසමත් විය.";
    await reply(`${aiResponse}`);
  } catch (error) {
    console.error(error);
    reply("❌ ප්‍රශ්නය සැකසීමේදී දෝෂයක් ඇති විය. 😢");
  }
});
