import { Client, GatewayIntentBits, Collection, Message } from 'discord.js';
import 'dotenv/config';
import { readdirSync } from 'fs';
import { join } from 'path';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const commands = new Collection() as Collection<string, Command>;
const prefix = '.';
interface Command {
  default: {
    name: string;
    description: string;
    execute: (message: Message, args: string[]) => void | Promise<void>;
  };
}

(async () => {
  const commandFiles = readdirSync(join(process.cwd(), 'dist', 'commands')).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)) as Command;
    commands.set(command.default.name, command);
  }

  console.log(commands);

  client.on('ready', () => {
    console.log('bot is online');
  });

  client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content
      .slice(prefix.length)
      .split(' ')
      .filter(arg => arg !== '');
    console.log(args);

    const command = args[0];
    if (typeof commands.get(command) !== 'undefined') commands.get(command)?.default.execute(message, args);
  });

  client.login(process.env.TOKEN);
})();