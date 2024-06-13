import { routineTable } from "./routineModel";
import { exerciseTable } from "./exerciseModel";
import { relations } from "drizzle-orm";
import {
  integer,
  real,
  sqliteTable,
} from "drizzle-orm/sqlite-core";

export const exerciseToRoutineTable = sqliteTable(
  "exercise_to_routine",
  {
    id: integer("id").primaryKey({autoIncrement: true}),
    routineId: integer("routine_id")
      .references(() => routineTable.id, { onDelete: "cascade" })
      .notNull(),
    exerciseId: integer("exercise_id")
      .references(() => exerciseTable.id, { onDelete: "cascade" })
      .notNull(),
    order: integer("order").notNull(),
    reps: integer("reps").notNull(),
    sets: integer("sets").notNull(),
    kg: real("kg"),
  }
);

export const exerciseToRoutineRelation = relations(
  exerciseToRoutineTable,
  ({ one }) => ({
    exercise: one(exerciseTable),
    routine: one(routineTable),
  })
);
