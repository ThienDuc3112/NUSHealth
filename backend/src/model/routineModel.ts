import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { exerciseToRoutineTable } from "./exerciseToRoutineModel";
import { userTable } from "./userModel";

export const routineTable = pgTable("routines", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  breakTime: integer("break_time"),
  creatorId: integer("creator_id").references(() => userTable.id),
});

export const routineRelation = relations(routineTable, ({ one, many }) => ({
  exercise: many(exerciseToRoutineTable),
  creator: one(userTable),
}));
