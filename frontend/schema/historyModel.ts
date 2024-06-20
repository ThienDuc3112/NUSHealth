import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const historyTable = sqliteTable("history", {
  id: integer("id").primaryKey({autoIncrement: true}),
  startTime: integer("time", {mode: "timestamp_ms"}),
  endTime: integer("time", {mode: "timestamp_ms"}),
})
