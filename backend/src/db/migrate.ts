import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { config } from "dotenv";
config();

const pool = new Pool({ connectionString: process.env.DB_URL });
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
