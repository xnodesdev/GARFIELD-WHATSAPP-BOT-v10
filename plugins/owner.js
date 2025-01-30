const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png' }, // Image URL from your request
            caption: '*ＧＡＲＦＩＥＬＤ ＢＯＴ ｖ10*\n\n_ＸＮＯＤＥＳ ＤＥＶＥＬＯＰＭＥＮ_\n\n*Support and Contact Tharindu Liyanage*\n\n`Contact : t.me/TharinduLiyanage` \n\n `Instagram https://www.instagram.com/liyanage_tharindu_?igsh=ZGsxcGZwb2dueDk0` \n\n`Facebook : https://www.facebook.com/share/1KLPQPoVRg/`', // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363358310754973@newsletter',
                    newsletterName: '𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your 

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
