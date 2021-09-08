import { Client, Intents } from "discord.js";
import { commandSwitch } from "./commandSwitch";
import { guildCreateHandler } from "./events/guildCreate";
import { botToken } from "./lib/constants";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.on("guildCreate", guildCreateHandler);

client.on("messageCreate", commandSwitch);

client.on("ready", () => console.log(`Bot running on ${client.user?.tag}`));

export const runClient = () => client.login(botToken);
