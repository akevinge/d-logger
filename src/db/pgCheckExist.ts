import { QueryResult } from "pg";
import { pgPoolQuery } from ".";

type ExistCheckQueryResult = { exists: boolean };

const existColumnAlias = "exists";

const resultCallback = (q: QueryResult<ExistCheckQueryResult> | null) =>
  q?.rows?.[0]?.exists === true;

export const doesServerExist = ({ serverId }: { serverId: string }) =>
  pgPoolQuery<ExistCheckQueryResult>(
    `SELECT EXISTS(SELECT 1 FROM discord_servers WHERE discord_server_id=$1) AS "${existColumnAlias}"`,
    [serverId]
  ).then(resultCallback);

export const doesChannelExist = ({ channelId }: { channelId: string }) =>
  pgPoolQuery<ExistCheckQueryResult>(
    `SELECT EXISTS(SELECT 1 FROM discord_channels WHERE discord_channel_id=$1) AS "${existColumnAlias}"`,
    [channelId]
  ).then(resultCallback);
