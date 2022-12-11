require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
]});

client.on('ready', () => {
  console.log("Bot is ready");
});

client.on('messageCreate', (message: any) => {
  if(message.content === 'ping' ){
    message.channel.send('pong');
  }});

client.login(process.env.TOKEN);