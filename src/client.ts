import { Client, Intents, Permissions } from "discord.js";
import { insertChannel, insertMessage, insertServer } from "./db/insert";
import { channelExists, serverExists } from "./db/select";
import { Flags } from "./lib/commandsAndFlags";
import { prefix } from "./lib/constants";
import { containsFlags, matchFlag } from "./utils";

const client = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

client.on(
  "messageCreate",
  async ({
    content,
    author: { id: userId, bot: isBot },
    channelId,
    guildId,
    guild,
    channel,
  }) => {
    if (!isBot) {
      const isCommand = content.startsWith(prefix);

      const hasPerms = await guild.members
        .fetch({ user: userId })
        .then(({ permissions }) =>
          permissions.has([Permissions.FLAGS.ADMINISTRATOR])
        );

      if (isCommand && hasPerms) {
        const command = content.substring(content.indexOf(" ") - 1);

        if (containsFlags(command)) {
          try {
            const addServerString = matchFlag(command, Flags.ADD_SERVER_FLAG);

            const serverTags = addServerString
              ?.substring(addServerString.indexOf(" "))
              .trim();

            const addChannelString = matchFlag(command, Flags.ADD_CHANNEL_FLAG);

            const channelTags = addChannelString
              .substring(addChannelString.indexOf(" "))
              .trim();

            if (
              (addServerString && !serverTags) ||
              (addChannelString && !channelTags)
            ) {
              throw new Error("");
            }

            serverExists(guildId).then(async (exists) => {
              if (!exists && serverTags) {
                insertServer({
                  discord_server_id: guildId,
                  server_tags: serverTags,
                }).then(() => channel.send("Server added"));
              }
              const hasChannel = await channelExists(channelId);
              if (channelTags && (!exists || (exists && !hasChannel))) {
                insertChannel({
                  discord_channel_id: channelId,
                  discord_server_id: guildId,
                  channel_tags: channelTags,
                });
              }

              if (hasChannel && serverTags && exists) {
                channel.send("Server and channel already added");
              } else if (channelTags && hasChannel) {
                channel.send("Channel already added");
              }
            });
          } catch (err) {
            channel.send(
              `Incorrect format. Ex: ${prefix} -s tag1,tag2,tag3 -c tag1,tag2,tag3`
            );
          }
        }
      } else if (!isCommand) {
        insertMessage({
          discord_author_id: userId,
          message: content,
          discord_channel_id: channelId,
          discord_server_id: guildId,
        });
      }
    }
  }
);

client.on("ready", () => console.log(`Bot running on ${client.user?.tag}`));

export const runClient = () => client.login(process.env.BOT_TOKEN);
