import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("displayname", { length: 50 }),
  email: varchar("email").notNull().unique(),
  password: varchar("password"),
  activated: boolean("activated").default(false),
  bio: varchar("bio"),
});
