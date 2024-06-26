import { bigserial, integer, pgTable, real } from "drizzle-orm/pg-core";
import { routineTable } from "./routineModel";
import { exerciseTable } from "./exerciseModel";
import { relations } from "drizzle-orm";

export const exerciseToRoutineTable = pgTable(
  "exercise_to_routine",
  {
    id: bigserial("id", {mode: "bigint"}).primaryKey(),
    routineId: integer("routine_id")
      .references(() => routineTable.id, { onDelete: "cascade" })
      .notNull(),
    exerciseId: integer("exercise_id")
      .references(() => exerciseTable.id, { onDelete: "cascade" })
      .notNull(),
    order: integer("order").notNull(),
    reps: integer("reps"),
    sets: integer("sets"),
    kg: real("kg"),
  });

export const exerciseToRoutineRelation = relations(
  exerciseToRoutineTable,
  ({ one }) => ({
    exercise: one(exerciseTable),
    routine: one(routineTable),
  })
);
