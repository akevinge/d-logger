import { pgPoolQuery } from ".";

export const pgAddServer = ({
  serverId,
  serverTags = null,
  ownerId,
  serverName,
}: {
  serverId: string;
  serverTags?: string | null;
  ownerId: string;
  serverName: string;
}) => {
  return pgPoolQuery(
    "INSERT INTO discord_servers(discord_server_id, server_tags, owner_id, server_name, insert_date) VALUES($1, $2, $3, $4, current_timestamp)",
    [serverId, serverTags, ownerId, serverName]
  );
};
