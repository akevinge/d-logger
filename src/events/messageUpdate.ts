import { Message, PartialMessage } from "discord.js";
import { pgUpdateMessage } from "../db/pgUpdateMessage";

// the message id stays the same
export const messageUpdateHandler = (
  { id: messageId }: Message | PartialMessage,
  { content: newMessageContent }: Message | PartialMessage
) => {
  if (newMessageContent) pgUpdateMessage({ messageId, newMessageContent });
};
