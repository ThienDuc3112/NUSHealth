import { Request } from "express";
import { users } from "../db/schema/user";

export interface AuthRequest extends Request {
  user?: typeof users.$inferSelect;
}
