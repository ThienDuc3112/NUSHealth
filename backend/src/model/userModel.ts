import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { exerciseTable } from "./exerciseModel";
import { routineTable } from "./routineModel";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("displayname", { length: 50 }),
  email: varchar("email").notNull().unique(),
  password: varchar("password"),
  activated: boolean("activated").default(false),
});

export const userRelation = relations(userTable, ({ many }) => ({
  exercise: many(exerciseTable),
  routine: many(routineTable),
}));
