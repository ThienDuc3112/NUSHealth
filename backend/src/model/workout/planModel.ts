import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { userTable } from "../userModel";
import { relations } from "drizzle-orm";
import { routineToPlanTable } from "./routineToPlanModel";

export const planTable = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  creatorId: integer("creator_id").references(() => userTable.id, {
    onDelete: "set null",
  }),
});

export const planRelation = relations(planTable, ({ one, many }) => ({
  routine: many(routineToPlanTable),
  creator: one(userTable),
}));
