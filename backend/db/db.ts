import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
client.connect().then(() => {
  console.log("Connect to db");
});
export const db = drizzle(client);
