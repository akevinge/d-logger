import { Message } from "discord.js";
import { pgAddMessage } from "../db/pgAddMessage";
import { doesChannelExist } from "../db/pgCheckExist";
import { messageContentFilter } from "../utils";

export const messageCreateHandler = ({
  channelId,
  content,
  guildId,
  author: { id: authorId },
  id: messageId,
}: Message) => {
  const filteredContent = messageContentFilter(content).trim();
  if (guildId && filteredContent !== "") {
    doesChannelExist({ channelId }).then((exists) => {
      if (exists) {
        pgAddMessage({
          messageId,
          messageContent: filteredContent,
          channelId,
          serverId: guildId,
          authorId,
        });
      }
    });
  }
};
