import { index, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { historyTable } from "./historyModel";
import { exerciseTable } from "./exerciseModel";

export const historySetTable = sqliteTable("history_set", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kg: integer("id"),
  reps: integer("reps").notNull(),
  historyKey: integer("history_key").references(() => historyTable.id).notNull(),
  exerciseId: integer("exercise_id").references(() => exerciseTable.id).notNull()
}, (table) => ({
  indexHistoryKey: index("history_key_idx").on(table.historyKey)
}))
