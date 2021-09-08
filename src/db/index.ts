import { Pool, PoolClient, QueryResult } from "pg";
import {
  PGDATABASE,
  PGHOST,
  PGPASSWORD,
  PGPORT,
  PGUSER,
} from "../lib/dbConfig";

const pgPool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  idleTimeoutMillis: 1000 * 60 * 3,
  connectionTimeoutMillis: 1000 * 10,
  port: PGPORT,
});

const pgPoolConnect = () =>
  pgPool.connect().catch(() => {
    console.log("PG Connection Error");
    process.exit(-1);
  });

export const pgPoolQuery = <T = any>(
  sqlString: string,
  values: any[] = []
): Promise<QueryResult<T> | null> =>
  pgPoolConnect().then((client) =>
    client
      .query(sqlString, values)
      .finally(() => client.release())
      .catch(() => null)
  );
