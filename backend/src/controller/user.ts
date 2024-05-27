import { Request, Response } from "express";
import { db } from "../../db/db";
import { userTable } from "../model/user/userModel";

export const getUserCount = async (req: Request, res: Response) => {
  const result = await db.select({}).from(userTable);
  res.json({ count: result.length });
};
