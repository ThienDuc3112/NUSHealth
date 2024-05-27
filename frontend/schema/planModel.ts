import { relations } from "drizzle-orm";
import { routineToPlanTable } from "./routineToPlanModel";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const planTable = sqliteTable("plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export const planRelation = relations(planTable, ({ one, many }) => ({
  routine: many(routineToPlanTable),
}));
