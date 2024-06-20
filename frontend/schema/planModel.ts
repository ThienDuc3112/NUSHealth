import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const planTable = sqliteTable("plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description")
});
