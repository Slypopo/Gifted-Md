const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ZjaHB0OUl1NENxVnd0YnZMMHY0ekdZcHZ4UmlDaElQN1NsdWhtM29uUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzJXdzRiNXRBTXRxV0RZaGxMK1FZeHNhblJuZ1QxOWZDMHhUZUc0UHUwaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRW4wNnIxQTloeEdrOFl6Ulk2dmN1Slg2RnkyY0ZtY2lCYWd2bXlJVDI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrU3pOOGM0K1hXTXI2VkwwS3plYW00ZHJEeStFcnF0d1B6bW5Oa3M0RW1NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllCTk9LS1l5WDRBeUw4dlR5UVdDK0xrWDlMbXRySEhZSXk0emhxd2lDbk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBHNkFDSTVZa29UMTdjOE9IMjdDZWlTYzdGRUtueDlXV0VWbEk1WTFhQzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUFxOUwzSDVrQThSRHVlQzJ6Q2trUEVxc3dFN0IxNzg5YkptNDNuaEIxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYi9BWS9xd1NKeXUydERuNHRRakVCam51WjhOY3hSVXJ6L2orRjRnUGxnMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inl2Q05EbnFzOEg0aFh2Z3ZiODF1RVI2bXJYdENLVEZtZVJZdEhhWm5JMndwbEY0dXJCMlZHYWhhblZtZ2Vld2tQL1dJQnhtRUwrMi9RcVZuTThDWWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiIrTHJjU0xSU0xFc3lUdWVqMm9Dc1ZkT21ZUlNMbmYxQXFMM2xMWVNxY1pFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoLWtpUnJwbFFBeVNaQ3NJSFVtZmlRIiwicGhvbmVJZCI6IjllZGUzNDY1LWI1NjktNDZhMy1hZGQ1LTc5NDg3ZTQxNzE0NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKa0xLNmdjTXJUS1pwZ0NKcDdDS0szd2NIblk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVhtQVZKTlYwNTBJUHVxeHpYOWU3bE1aUDRnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVQQTc1SFZXIiwibWUiOnsiaWQiOiIyMzM1MDYwODc0MzA6NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJrb2pvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQT283ZU1HRU9Ia3dMTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJleXM3eVZEdkdib0d6VmptMWFXTGNQOGI3Ymt2MHduQXVtRnlmck4vazFzPSIsImFjY291bnRTaWduYXR1cmUiOiJMdXV2dlFUV0szMFlNRlEwQ2VFaloySzV5WU9tWlFSUmNVdjkxNTNUT20rZDgrNEorbWxDUEVLVjZWbS9aWTgyRGVKc0E3bFh6ZHV6cDMzVG1nM01Bdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoia1dHR1VLbDA4MnBNQUhyMENjaDlFakJNZGprOERzbkhNMFl2WHNra25BSjNsd0pneDFQSVlqTFI4Q1pvRTNqWldCZFZwQklqWjdxamJzYU9FZVhrakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1MDYwODc0MzA6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYc3JPOGxRN3htNkJzMVk1dFdsaTNEL0crMjVMOU1Kd0xwaGNuNnpmNU5iIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4NjI4OTc2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KINNY BOT",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "233506087430", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'KINNY BOT',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/23998e60fad313cd316fc.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'unavailable',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

