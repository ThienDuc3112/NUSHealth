import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { db } from "../../db/db";
import { userTable } from "../model/user/userModel";
import { eq } from "drizzle-orm";
import { AuthRequest } from "../types/auth";

export const authUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token");
    return next();
  }
  try {
    const payload: any = verify(token, process.env.SECRET!);
    const user = (
      await db.select().from(userTable).where(eq(userTable.id, payload.id))
    )[0];
    req.user = user;
  } catch (error) {
    console.error(error);
  }
  next();
};
