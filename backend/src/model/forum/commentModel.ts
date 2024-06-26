import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "../user/userModel";
import { postTable } from "./postModel";

export const commentTable = pgTable("comment", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  editAt: timestamp("edit_at").defaultNow(),
  userId: integer("user_id").references(() => userTable.id, {
    onUpdate: "cascade",
    onDelete: "set null"
  }),
  postId: integer("post_id").references(() => postTable.id).notNull(),
  isDeleted: boolean("isDeleted").default(false)
})
