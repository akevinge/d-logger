import { Message } from "discord.js";
import { pgAddChannel } from "../db/pgAddChannel";
import { doesChannelExist, doesServerExist } from "../db/pgCheckExist";
import { extractChannelId } from "../utils";
import { Commands } from "./Commands";

const cmAddChannelHandler = async ({ content, channel, guildId }: Message) => {
  const msgContent = content;
  const channelId = extractChannelId(msgContent);

  if (guildId) {
    if (!channelId) {
      channel.send(
        Commands.ADD_CHANNEL_COMMAND.COMMAND_ERROR_MESSAGES.INCORRECT_FORMAT
      );
      return;
    }
    doesServerExist({ serverId: guildId }).then((serverExists) => {
      if (serverExists) {
        doesChannelExist({ channelId }).then((channelExists) => {
          if (channelExists) {
            channel.send(
              Commands.ADD_CHANNEL_COMMAND.COMMAND_ERROR_MESSAGES
                .CHANNEL_ALREADY_EXISTS
            );
          } else {
            pgAddChannel({ channelId, discordServerId: guildId });
          }
        });
      } else {
        channel.send(
          Commands.ADD_CHANNEL_COMMAND.COMMAND_ERROR_MESSAGES
            .CHANNEL_DOES_NOT_EXIST
        );
      }
    });
  }
};

export default cmAddChannelHandler;
