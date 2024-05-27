import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { exerciseTable } from "../workout/exerciseModel";
import { routineTable } from "../workout/routineModel";
import { planTable } from "../workout/planModel";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("displayname", { length: 50 }),
  email: varchar("email").notNull().unique(),
  password: varchar("password"),
  activated: boolean("activated").default(false),
  bio: varchar("bio"),
});

export const userRelation = relations(userTable, ({ many }) => ({
  exercise: many(exerciseTable),
  routine: many(routineTable),
  plan: many(planTable),
}));
