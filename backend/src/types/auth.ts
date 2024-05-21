import { Request } from "express";
import { userTable } from "../model/userModel";

export interface AuthRequest extends Request {
  user?: typeof userTable.$inferSelect;
}
