import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  userName: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("displayname", { length: 50 }),
  email: varchar("email").notNull().unique(),
  password: varchar("password"),
});
