import { pgPool } from ".";

export const insertMessage = (message: string) => {
  return pgPool
    .connect()
    .then((client) => {
      client
        .query(
          "INSERT into main(message, date) VALUES($1, current_timestamp) RETURNING *",
          [message]
        )
        .catch((err) => process.exit(-1))
        .finally(() => client.release());
    })
    .catch((err) => process.exit(-1));
};
