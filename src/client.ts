import { Client, Intents } from "discord.js";
import { insertMessage } from "./db/insert";

const client = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

client.on("messageCreate", async ({ content, author }) => {
  if (!author.bot) {
    insertMessage(content);
  }
});

client.on("ready", () => console.log(`Bot running on ${client.user?.tag}`));

export const runClient = () => client.login(process.env.BOT_TOKEN);
