import { routineTable } from "./routineModel";
import { planTable } from "./planModel";
import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";

export const routineToPlanTable = sqliteTable(
  "routine_to_plan",
  {
    routineId: integer("routine_id")
      .notNull()
      .references(() => routineTable.id, { onDelete: "cascade" }),
    planId: integer("plan_id")
      .notNull()
      .references(() => planTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.planId, table.routineId] }),
  })
);
