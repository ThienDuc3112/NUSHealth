import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const pool = new Pool(process.env.NODE_ENV == "production" ? {
  connectionString: process.env.DB_URL
}:{
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
const client = drizzle(pool);

const main = async () => {
  console.log("Starting migration...");
  await migrate(client, { migrationsFolder: "drizzle" });
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("Migration ended");
  });
