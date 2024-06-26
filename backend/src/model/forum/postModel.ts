import { boolean, index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { userTable } from "../user/userModel";

export const postTable = pgTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  body: text("body").notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  userId: integer("user_id").references(() => userTable.id, {
    onDelete: "set null",
    onUpdate: "cascade"
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  editAt: timestamp("edit_at").defaultNow().notNull(),
}, (table) => ({
  userIndex: index("post_user_index").on(table.userId),
}))
