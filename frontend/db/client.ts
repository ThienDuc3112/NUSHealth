import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const dbConnection = openDatabaseSync("NUSHealthLocal.db");

export const db = drizzle(dbConnection);
