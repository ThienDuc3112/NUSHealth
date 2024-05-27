import { relations } from "drizzle-orm";
import { exerciseToRoutineTable } from "./exerciseToRoutineModel";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const routineTable = sqliteTable("routines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  restTime: integer("rest_time"),
});

export const routineRelation = relations(routineTable, ({ one, many }) => ({
  exercise: many(exerciseToRoutineTable),
}));
