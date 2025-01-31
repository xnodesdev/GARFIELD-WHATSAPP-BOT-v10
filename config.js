const fs = require('fs');

function convertToBool(text, fault = 'true') {
    return text.toLowerCase() === fault.toLowerCase();
}

module.exports = {
    SESSION_ID: "Xnodes~IwJAwJ6b#9Rwpk7VmszoUEy-Hwxth_3a-kZTrt0EwNP48KmBo9i8", // add your Session Id  
    AUTO_STATUS_SEEN: true,  // set to true or false for auto-seeing status
    AUTO_STATUS_REPLY: false,  // set to true if you want auto-reply on status
    AUTO_STATUS_REACT: true,  // set to true if you want auto-react on status
    AUTO_STATUS_MSG: "GARFIELD-WHATSAPP-BOT-v10",  // set the auto-reply message for status replies
    PREFIX: ".",  // add your prefix for the bot
    BOT_NAME: "𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т",  // add bot name for the menu
    STICKER_NAME: "GARFIELD-WHATSAPP-BOT-v10",  // set the sticker pack name
    CUSTOM_REACT: true,  // set to true for custom emoji reactions
    CUSTOM_REACT_EMOJIS: "🦋,🐼,☘️,💬",  // choose custom react emojis
    DELETE_LINKS: false,  // set to true for automatic deletion of links without removing member
    OWNER_NUMBER: "94711502119",  // add your bot owner number
    OWNER_NAME: "@@Sanku",  // add bot owner name
    DESCRIPTION: "©Ｐｏｗｅｒｅｄ ｂｙ Ｘｎｏｄｅｓ",  // add bot description
    ALIVE_IMG: "https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png",  // add image URL for alive message
    LIVE_MSG: "> 𝖢𝗈𝖽𝖾𝖽 𝖻𝗒 𝖳𝗁𝖺𝗋𝗂𝗇𝖽𝗎 𝖫𝗂𝗒𝖺𝗇𝖺𝗀𝖾",  // add alive message
    READ_MESSAGE: false,  // set to true or false for automatic reading of messages
    AUTO_REACT: false,  // set to true or false for auto-reactions on all messages
    ANTI_BAD: false,  // set to true for anti-bad words filter
    MODE: "public",  // set the bot mode to public, private, inbox, or group
    ANTI_LINK: true,  // set to true for anti-link protection in groups
    AUTO_VOICE: false,  // set to true for sending automatic voices
    AUTO_STICKER: false,  // set to true for sending automatic stickers
    AUTO_REPLY: false,  // set to true for automatic text replies
    ALWAYS_ONLINE: true,  // set to true for always being online
    PUBLIC_MODE: true,  // set to false for private mode
    AUTO_TYPING: false,  // set to true for automatic show typing
    READ_CMD: false,  // set to true to mark commands as read
    DEV: "94711502119",  // replace with your WhatsApp number
    ANTI_VV: true,  // set to true for anti-once view
    ANTI_DEL_PATH: "log",  // change to 'same' if you want to resend deleted message in the same chat
    AUTO_RECORDING: false  // set to true for auto-recording
};



