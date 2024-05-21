import { Request } from "express";
import { users } from "@/src/model/user";

export interface AuthRequest extends Request {
  user?: typeof users.$inferSelect;
}
