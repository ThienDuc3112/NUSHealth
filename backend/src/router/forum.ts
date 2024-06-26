import { Router } from "express";
import { getAllPost, getPostById } from "../controller/forum";

export const forumRouter = Router();

forumRouter.get("/all", getAllPost)
forumRouter.get("/get/:id", getPostById)
