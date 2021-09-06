import { pgPool } from ".";

export const serverExists = (discord_server_id: string) => {
  return pgPool.connect().then((client) => {
    return client
      .query(
        'SELECT EXISTS(SELECT 1 FROM servers WHERE discord_server_id=$1) AS "exists"',
        [discord_server_id]
      )
      .then(({ rows }) => {
        return rows[0]?.exists === true;
      })
      .catch((x) => false)
      .finally(() => client.release());
  });
};

export const channelExists = (discord_channel_id: string) => {
  return pgPool.connect().then((client) => {
    return client
      .query(
        'SELECT EXISTS(SELECT 1 FROM channels WHERE discord_channel_id=$1) AS "exists"',
        [discord_channel_id]
      )
      .then(({ rows }) => {
        return rows[0]?.exists === true;
      })
      .catch((x) => false)
      .finally(() => client.release());
  });
};
