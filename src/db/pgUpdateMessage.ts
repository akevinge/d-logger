import { pgPoolQuery } from ".";

export const pgUpdateMessage = ({
  messageId,
  newMessageContent,
}: {
  messageId: string;
  newMessageContent: string;
}) => {
  return pgPoolQuery(
    "UPDATE discord_messages SET message=$1 WHERE discord_message_id=$2",
    [newMessageContent, messageId]
  );
};
