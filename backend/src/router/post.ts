import { Router } from "express";
import { createPost, getAllPost, getPostById } from "../controller/post";
import { authUser } from "../middleware/auth";

export const postRouter = Router();

postRouter.get("/all", getAllPost)
postRouter.get("/get/:id", getPostById)
postRouter.post("/new", authUser as any, createPost as any)
