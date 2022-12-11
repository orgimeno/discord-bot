require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');

const { Client, GatewayIntentBits, Collection, Message } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
]});
const commands = new Collection() as Collection<string, Command>;

const commanddFiles = readdirSync(join(process.cwd(), 'dist', 'commands'))
  .filter(file => file.endsWith('.js'));

console.log(commanddFiles);

interface Command {
  default: {
    name: string;
    description: string;
    execute: (message: Message, args: string[]) => void | Promise<void>;
  };
}

client.on('ready', () => {
  console.log("Bot is ready");
});

client.on('messageCreate', (message: any) => {
  if(message.content === 'ping' ){
    message.channel.send('pong');
}});

client.login(process.env.TOKEN);