import { Message } from "discord.js";
import { pgAddMessage } from "../db/pgAddMessage";
import { doesChannelExist } from "../db/pgCheckExist";

export const messageCreateHandler = ({
  channelId,
  content,
  guildId,
  author: { id: authorId },
}: Message) => {
  if (guildId) {
    doesChannelExist({ channelId }).then((exists) => {
      if (exists) {
        pgAddMessage({
          messageContent: content,
          channelId,
          serverId: guildId,
          authorId,
        });
      }
    });
  }
};
