import { __prod__ } from "./constants";

export const PGUSER = process.env.PGUSER || "root";
export const PGHOST = __prod__ ? process.env.PGHOST : "localhost";
export const PGPASSWORD = process.env.PGPASSWORD!;
export const PGDATABASE = process.env.PGDB!;
export const PGPORT = __prod__ ? parseInt(process.env.PGPORT) : 5432;
