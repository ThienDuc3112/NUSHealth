import { boolean, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "../user/userModel";
import { postTable } from "./postModel";

export const commentTable = pgTable("comment", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  editAt: timestamp("edit_at").defaultNow().notNull(),
  userId: integer("user_id").references(() => userTable.id, {
    onUpdate: "cascade",
    onDelete: "set null"
  }),
  postId: integer("post_id").references(() => postTable.id).notNull(),
  isDeleted: boolean("isDeleted").notNull().default(false)
}, (table) => ({
  userIndex: index("comment_user_index").on(table.userId),
  postIndex: index("comment_post_index").on(table.postId)
}))
