import { Message } from "../models/Message";
import { pgPool } from ".";
import { Server } from "../models/Server";
import { Channel } from "../models/Channel";
import { channelExists } from "./select";

export const insertServer = ({ discord_server_id, server_tags }: Server) => {
  return pgPool
    .connect()
    .then((client) => {
      client
        .query(
          "INSERT INTO servers(discord_server_id, server_tags) VALUES($1, $2)",
          [discord_server_id, server_tags]
        )
        .catch((err) => process.exit(-1))
        .finally(() => client.release());
    })
    .catch((err) => process.exit(-1));
};

export const insertChannel = ({
  discord_server_id,
  discord_channel_id,
  channel_tags,
}: Channel) => {
  return pgPool
    .connect()
    .then((client) => {
      client
        .query(
          "INSERT INTO channels(discord_channel_id, discord_server_id, channel_tags) VALUES($1, $2, $3)",
          [discord_channel_id, discord_server_id, channel_tags]
        )
        .catch((err) => process.exit(-1))
        .finally(() => client.release());
    })
    .catch((err) => process.exit(-1));
};

export const insertMessage = ({
  message,
  discord_author_id,
  discord_channel_id,
  discord_server_id,
}: Message) => {
  pgPool
    .connect()
    .then((client) => {
      channelExists(discord_channel_id).then((exists) => {
        if (!exists) return;

        client
          .query(
            "INSERT into messages(message, date, discord_channel_id, discord_server_id, discord_author_id) VALUES($1, current_timestamp, $2, $3, $4)",
            [message, discord_channel_id, discord_server_id, discord_author_id]
          )
          .catch((err) => process.exit(-1))
          .finally(() => client.release());
      });
    })
    .catch((err) => process.exit(-1));
};
