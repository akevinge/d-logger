import { pgPoolQuery } from ".";

export const pgDeleteMessage = ({ messageId }: { messageId: string }) => {
  return pgPoolQuery(
    "DELETE FROM discord_messages WHERE discord_message_id=$1",
    [messageId]
  );
};
