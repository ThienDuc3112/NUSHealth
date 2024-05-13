import { Request, Response } from "express";
import { db } from "../db/db";
import { users } from "../db/schema/user";

export const getUserCount = async (req: Request, res: Response) => {
  const result = await db.select({}).from(users);
  res.json({ count: result.length });
};
