import { pgPoolQuery } from ".";

export const pgAddMessage = ({
  messageContent,
  messageId,
  channelId,
  serverId,
  authorId,
}: {
  messageContent: string;
  messageId: string;
  channelId: string;
  serverId: string;
  authorId: string;
}) => {
  return pgPoolQuery(
    "INSERT into discord_messages(message, date, discord_channel_id, discord_server_id, discord_author_id, discord_message_id) VALUES($1, current_timestamp, $2, $3, $4, $5)",
    [messageContent, channelId, serverId, authorId, messageId]
  );
};
