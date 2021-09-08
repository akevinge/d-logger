import { pgPoolQuery } from ".";

export const pgAddChannel = ({
  channelId,
  channelTags = null,
  discordServerId,
}: {
  channelId: string;
  channelTags?: string | null;
  discordServerId: string;
}) => {
  return pgPoolQuery(
    "INSERT INTO discord_channels(discord_channel_id, discord_server_id, channel_tags, insert_date) VALUES($1, $2, $3, current_timestamp)",
    [channelId, discordServerId, channelTags]
  );
};
