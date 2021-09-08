import { Message, PartialMessage } from "discord.js";
import { pgDeleteMessage } from "../db/pgDeleteMessage";

export const messageDeleteHandler = async ({
  id: messageId,
}: Message | PartialMessage) => {
  pgDeleteMessage({ messageId });
};
