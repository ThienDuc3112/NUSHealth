import { Router } from "express";
import { getUserCount } from "../controller/user";

export const userRouter = Router();

userRouter.get("/count", getUserCount);
