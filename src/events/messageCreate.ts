import { Message } from "discord.js";
import { pgAddMessage } from "../db/pgAddMessage";
import { doesChannelExist } from "../db/pgCheckExist";

export const messageCreateHandler = ({
  channelId,
  content,
  guildId,
  author: { id: authorId },
  id: messageId,
}: Message) => {
  if (guildId) {
    doesChannelExist({ channelId }).then((exists) => {
      if (exists) {
        pgAddMessage({
          messageId,
          messageContent: content,
          channelId,
          serverId: guildId,
          authorId,
        });
      }
    });
  }
};
