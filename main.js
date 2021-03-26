const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const prefix = 't ';

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot ready!');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const commandComponent = client.commands.get(command);

    if (commandComponent != null) {
        commandComponent.execute(message, args);
    }
})

client.login(process.env.BOT_CLIENT_KEY);
