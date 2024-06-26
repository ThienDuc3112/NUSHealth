import { Request, Response } from "express";
import { loginProp, registerProp } from "../types/auth";
import { db } from "../../db/db";
import { userTable } from "../model/user/userModel";
import { eq, or } from "drizzle-orm";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { data, error } = await registerProp.safeParseAsync(req.body);
  if (error) {
    console.error(error);
    return res.status(400).json(error.formErrors.fieldErrors);
  }
  if (data.password !== data.passwordVerify)
    return res
      .status(400)
      .json({ passwordVerify: ["The field must be the same as password"] });

  const testUnique = await db
    .select()
    .from(userTable)
    .where(
      or(eq(userTable.username, data.username), eq(userTable.email, data.email))
    );
  if (testUnique.length > 0) {
    const err: { username?: string; email?: string } = {};
    testUnique.forEach((user) => {
      if (user.username == data.username) err.username = "Username taken";
      if (user.email == data.email) err.email = "Email already used";
    });
    res.status(400).json(err);
    return;
  }

  try {
    const hashedPassword = await hash(data.password, 10);
    await db.insert(userTable).values({
      ...data,
      password: hashedPassword,
    });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.json(500).json({ message: "Cannot create user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { data, error } = await loginProp.safeParseAsync(req.body);
  if (error) {
    console.error(error);
    return res.status(400).json(error.formErrors.fieldErrors);
  }
  const user = (
    await db
      .select()
      .from(userTable)
      .where(
        or(
          eq(userTable.username, data.username),
          eq(userTable.email, data.username)
        )
      )
  )[0];
  if (!user) return res.status(400).json({ username: ["User not found"] });
  if (!user.password)
    return res.status(400).json({
      password: [
        "This user don't use password, try using oauth associated with this account",
      ],
    });
  try {
    const isCorrectPassword = await compare(data.password, user.password);
    if (!isCorrectPassword)
      return res.status(401).json({ password: ["Incorrect password"] });
    const payload = { id: user.id, username: user.username };
    const token = sign(payload, process.env.SECRET!, { expiresIn: "3d" });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot authenticate user" });
  }
};
