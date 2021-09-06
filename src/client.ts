import { Client, Intents, Permissions } from "discord.js";
import { insertChannel, insertMessage, insertServer } from "./db/insert";
import { channelExists, serverExists } from "./db/select";
import { Flags } from "./lib/commandsAndFlags";
import { prefix } from "./lib/constants";
import {
  containsFlags,
  matchAddChannelFlagInfo,
  matchAddChannelString,
  matchFlag,
} from "./utils";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.on(
  "messageCreate",
  async ({
    content,
    author,
    author: { id: userId, bot: isBot },
    channelId,
    guildId,
    guild,
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

            const addChannelString = matchAddChannelString(command);

            const { addChannelId, channelTags } = addChannelString
              ? matchAddChannelFlagInfo(addChannelString)
              : { addChannelId: null, channelTags: null };

            if (
              (addServerString && !serverTags) ||
              (addChannelString && (!channelTags || !addChannelId))
            ) {
              throw new Error("");
            }

            serverExists(guildId).then(async (exists) => {
              if (!exists && serverTags) {
                insertServer({
                  discord_server_id: guildId,
                  server_tags: serverTags,
                }).then(() => author.send("Server added"));
              } else if (serverTags) {
                author.send("Server already added");
              }
              const hasChannel = await channelExists(addChannelId);
              if (channelTags && (!exists || (exists && !hasChannel))) {
                insertChannel({
                  discord_channel_id: addChannelId,
                  discord_server_id: guildId,
                  channel_tags: channelTags,
                }).then(() => author.send("Channel Added"));
              }

              if (hasChannel && serverTags && exists) {
                author.send("Server and channel already added");
              } else if (channelTags && hasChannel) {
                author.send("Channel already added");
              }
            });
          } catch (err) {
            author.send(
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
