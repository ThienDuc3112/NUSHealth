import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { exerciseToRoutineTable } from "./exerciseToRoutineModel";
import { userTable } from "../user/userModel";

export const routineTable = pgTable("routines", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  restTime: integer("rest_time"),
  creatorId: integer("creator_id").references(() => userTable.id, {
    onDelete: "set null",
  }),
});

export const routineRelation = relations(routineTable, ({ one, many }) => ({
  exercise: many(exerciseToRoutineTable),
  creator: one(userTable),
}));
