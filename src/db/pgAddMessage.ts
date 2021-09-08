import { pgPoolQuery } from ".";

export const pgAddMessage = ({
  messageContent,
  channelId,
  serverId,
  authorId,
}: {
  messageContent: string;
  channelId: string;
  serverId: string;
  authorId: string;
}) => {
  return pgPoolQuery(
    "INSERT into discord_messages(message, date, discord_channel_id, discord_server_id, discord_author_id) VALUES($1, current_timestamp, $2, $3, $4)",
    [messageContent, channelId, serverId, authorId]
  );
};
