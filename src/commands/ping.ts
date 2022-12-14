import { Message } from 'discord.js';

export default {
  name: 'ping',
  description: 'this is a ping command',
  execute: (message: Message) => {
    message.channel.send('pong');
  }
};