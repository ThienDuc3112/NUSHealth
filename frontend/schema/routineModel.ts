import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const routineTable = sqliteTable("routines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  restTime: integer("rest_time"),
});
