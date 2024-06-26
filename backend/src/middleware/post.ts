import { NextFunction, Response } from "express";
import { PostRequest } from "../types/post";
import { db } from "../../db/db";
import { postTable } from "../model/forum/postModel";
import { eq } from "drizzle-orm";

export const getPost = async (req: PostRequest, res: Response, next: NextFunction) => {
  const id = Number(req.params.postId)
  if (isNaN(id)) return res.status(400).json({ messasge: "Invalid id" })
  try {
    const post = (await db.select().from(postTable)
      .where(eq(postTable.id, id)))[0]
    if (!post) return res.status(400).json({ message: "Post don't exist" })
    if (post.isDeleted) return res.status(401).json({ message: "Post deleted" })
    req.post = post;
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}
