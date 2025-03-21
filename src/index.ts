import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import loadModules from '@helpers/moduleLoader';
import { Logging } from '@helpers/logging';
import { getEnv } from '@helpers/env';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]}
);

client.on('ready', async client => {
	try {
		await loadModules(client);
	} catch (error) {
		Logging.error(`Error while loading modules: ${error}`);
	}
	
	client?.user.setActivity('Wilt u koffie of thee?', {type: ActivityType.Listening})
	
	Logging.info(`Client ready! Signed in as ${client.user.tag}!`);
})

client.login(getEnv('DISCORD_TOKEN'));