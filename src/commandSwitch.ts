import { Message, Permissions } from "discord.js";
import { prefix, __prod__ } from "./lib/constants";
import { extractCommand } from "./utils";
import { allCommands } from "./commands/Commands";
import { messageCreateHandler } from "./events/messageCreate";

export const commandSwitch = async (message: Message) => {
  const {
    author: { bot: isBot, id: authorId },
    guild,
    channel,
  } = message;
  if (!isBot && guild) {
    const { content } = message;

    const isCommand = content.startsWith(prefix);

    if (!isCommand) {
      messageCreateHandler(message);
      return;
    }

    const command = extractCommand(content);

    if (isCommand && !command) {
      channel.send("This command does not exist. Try 'dl; help' ");
    }

    if (isCommand && command) {
      const hasPerms = await guild.members
        .fetch({ user: authorId })
        .then(({ permissions }) =>
          permissions.has([Permissions.FLAGS.ADMINISTRATOR])
        );

      if (hasPerms) {
        const handler = require(`./commands/${
          allCommands.find(({ commandName }) => commandName === command)!
            .commandHandlerFile
        }.${__prod__ ? "js" : "ts"}`);

        handler.default(message);
      }
    }
  }
};
