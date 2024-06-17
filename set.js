const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZNVnZ2Wk50VVA4eDNRVEhxSGJIdERDeU85aFVBdlJRcGxETXBNL0xVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnNoclM1anJycVNROTladnhOMy8yRVkrdkxyeForMEtZWjlyQ1lVdGZBVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRzVNSkl3MUNHb2tqNm9oSjlUc1BjQlgwWnc3VXhXZmI1VS9lY3pQVDIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKb0tkZW1hQ2crSThDRFo1UkJqYmRwZkRUcGFmVDAxVGhxZWQzbkJReG5zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPQm56S2JHc1lTeDVVNVdCcWlLR21vL2VIbXZodjZaWng2QVY0UWsvMGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl5bUROR1F4Z2lWMDlCdXJIUnIrNzcxTFEwMElxdzVLN2RDM0xxMEpYalU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUNsd2w5dGxNWnFrTDE2aFZocUFJcGxGQVJheVJOOHNLOTNCVm5lRUVtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSE43OXllT2I1cUhmamVPN2dNckR4TC9uTHQ0MzVaRG10dFZNNXdNSEppdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1Sa0pJWXphOWVrZnE1YkFLUHRoTXRERFZoOWZnVDFkSG9RbTFEMForU1VzYkZvYTg0MThPMXVvRERqdGRYc04wdzREbFBQM3V0OUhJa0tQV3cwU2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6Im1rTWdycVZpV2VTYmdCZ0NtK2M1U2toeWluTElQWnBtNVJ5UTd6K21HdEk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Il9VdXc1VWtTUXh5OWpINThDMVZOOVEiLCJwaG9uZUlkIjoiZDFmMGNjM2ItYWRkNC00ZGE0LWEzODAtMzFjOTc2ZTdlMDU5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5LdXlNd2MreFU1UGZPQTV2L0VsUDZrYzhXRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSlNuMCtUbDRHYWR1YUYzVGRDU3ZGRXVJZGM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUzRWWVlXUEYiLCJtZSI6eyJpZCI6IjIzMzU5Njc4MDY4NTo1NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJPZHMgVGVjaG5vbG9naWVzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMalg3TUlCRUxpb3diTUdHRElnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaM3UxcnZYMFVQV1lDWGF5eGw0a1VidGNpRHBsblVTWHJiZ3dKUGNDTWlRPSIsImFjY291bnRTaWduYXR1cmUiOiJCdHMrdlJRZS9mU2RVRnJ4NzM2VVZFZXU3RzNPeTdFV3FpTlB1UENnRzIwMXd5aEhYb1Y3aFFSV1hjalJUcnBwZmRsZWpGODlmR2o5aWQzK045aVFBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVWcwazlvb2lDVzZRYmFTNG9MRmVkeStUMjFmdk9tRHpFT1AweVpQOGZuNDZFVlFQalFZYUZQR0JxSmJxZmo4YnVqemFtWVBlbEt6STViRW5aaE9yaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1OTY3ODA2ODU6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2Q3dGE3MTlGRDFtQWwyc3NaZUpGRzdYSWc2WloxRWw2MjRNQ1QzQWpJayJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODYzNzYzNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFdkoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🅾🅳🆂 🆃🅴🅲🅷🅽🅾🅻🅾🅶🅸🅴🆂",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "233596780685", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '🅾🅳🆂 🆃🅴🅲🅷🅽🅾🅻🅾🅶🅸🅴🆂',
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

