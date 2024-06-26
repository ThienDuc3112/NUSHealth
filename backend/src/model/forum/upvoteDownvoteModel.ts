import { boolean, index, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { userTable } from "../user/userModel";
import { postTable } from "./postModel";

export const votingTable = pgTable("voting", {
  userId: integer("user_id").references(() => userTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).notNull(),
  postId: integer("post_id").references(() => postTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).notNull(),
  upvote: boolean("isUpvote").default(true)
}, (table) => {
  return {
    pk: primaryKey({name: "primaryKey", columns: [table.userId, table.postId]}),
    userIndex: index("upvote_user_index").on(table.userId),
    postIndex: index("upvote_post_index").on(table.postId),
  }
})
