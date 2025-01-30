const fs = require('fs');

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: "", // add your Session Id
    AUTO_STATUS_SEEN: "true", // make true or false status auto seen
    AUTO_STATUS_REPLY: "false", // make true if you want auto reply on status 
    AUTO_STATUS_REACT: "true", // make true if you want auto like or react on status 
    AUTO_STATUS_MSG: "GARFIELD-WHATSAPP-BOT-v10", // set the auto reply message on status reply  
    PREFIX: ".", // add your prefix for bot   
    BOT_NAME: "𝖦Λ𝖱𝖥𝖨Ξ𝖫𝖣 𝖡𝖮Т", // add bot name here for menu
    STICKER_NAME: "GARFIELD-WHATSAPP-BOT-v10", // type sticker pack name 
    CUSTOM_REACT: "true", // make this true for custom emoji react    
    CUSTOM_REACT_EMOJIS: "🦋,🐼,☘️,💬", // chose custom react emojis by yourself 
    DELETE_LINKS: "false", // automatic delete links without remove member 
    OWNER_NUMBER: "94711502119", // add your bot owner number
    OWNER_NAME: "@@Sanku", // add bot owner name
    DESCRIPTION: "©Ｐｏｗｅｒｅｄ ｂｙ Ｘｎｏｄｅｓ", // add bot owner name    
    ALIVE_IMG: "https://i.ibb.co/5g7VGhC9/Picsart-25-01-30-13-20-52-736.png", // add img for alive msg
    LIVE_MSG: "> 𝖢𝗈𝖽𝖾𝖽 𝖻𝗒 𝖳𝗁𝖺𝗋𝗂𝗇𝖽𝗎 𝖫𝗂𝗒𝖺𝗇𝖺𝗀𝖾", // add alive msg here 
    READ_MESSAGE: "false", // Turn true or false for automatic read msgs
    AUTO_REACT: "false", // make this true or false for auto react on all msgs
    ANTI_BAD: "false", // false or true for anti bad words  
    MODE: "public", // make bot public-private-inbox-group 
    ANTI_LINK: "true", // make anti link true,false for groups 
    AUTO_VOICE: "false", // make true for send automatic voices
    AUTO_STICKER: "false", // make true for automatic stickers 
    AUTO_REPLY: "false", // make true or false automatic text reply 
    ALWAYS_ONLINE: "true", // makes true for always online 
    PUBLIC_MODE: "true", // make false if want private mode
    AUTO_TYPING: "false", // true for automatic show typing   
    READ_CMD: "false", // true if want mark commands as read 
    DEV: "94711502119", // replace with your WhatsApp number        
    ANTI_VV: "true", // true for anti once view 
    ANTI_DEL_PATH: "log", // change it to 'same' if you want to resend deleted message in same chat 
    AUTO_RECORDING: "false" // make it true for auto recording 
};