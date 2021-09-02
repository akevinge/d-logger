import { Pool } from "pg";
import {
  PGDATABASE,
  PGHOST,
  PGPASSWORD,
  PGPORT,
  PGUSER,
} from "../lib/dbConfig";

export const pgPool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  idleTimeoutMillis: 1000 * 60 * 3,
  connectionTimeoutMillis: 1000 * 10,
  port: PGPORT,
});
