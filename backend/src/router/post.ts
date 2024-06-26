import { Router } from "express";
import { createPost, deletePost, editPost, getAllPost, getPostById } from "../controller/post";
import { authUser } from "../middleware/auth";
import { getPost } from "../middleware/post";

export const postRouter = Router();

postRouter.get("/all", getAllPost)
postRouter.get("/get/:id", getPostById)
postRouter.post("/new", authUser as any, createPost as any)
postRouter.patch("/edit/:postId", authUser as any, getPost as any, editPost as any)
postRouter.put("/edit/:postId", authUser as any, getPost as any, editPost as any)
postRouter.delete("/delete/:postId", authUser as any, getPost as any, deletePost as any)
