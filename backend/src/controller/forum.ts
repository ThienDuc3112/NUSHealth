import { Request, Response } from "express";
import { AuthRequest } from "../types/auth";
import { db } from "../../db/db";
import { postTable } from "../model/forum/postModel";
import { count, eq } from "drizzle-orm";
import { commentTable } from "../model/forum/commentModel";
import { votingTable } from "../model/forum/upvoteDownvoteModel";

const upvoteCount = db
  .select({
    postId: votingTable.postId,
    upvoteCount: count()
  })
  .from(votingTable)
  .where(eq(votingTable.upvote, true))
  .groupBy(votingTable.postId)
  .as("upvote_count")

const downvoteCount = db
  .select({
    postId: votingTable.postId,
    downvoteCount: count()
  })
  .from(votingTable)
  .where(eq(votingTable.upvote, false))
  .groupBy(votingTable.postId)
  .as("downvote_count")

export const getAllPost = async (_: Request, res: Response) => {
  try {
    const commentCount = db
      .select({
        postId: commentTable.postId,
        commentCount: count()
      })
      .from(commentTable)
      .groupBy(commentTable.postId)
      .as("comment_count")

    const posts = await db.select().from(postTable)
      .where(eq(postTable.isDeleted, false))
      .leftJoin(upvoteCount, eq(upvoteCount.postId, postTable.id))
      .leftJoin(downvoteCount, eq(downvoteCount.postId, postTable.id))
      .leftJoin(commentCount, eq(commentCount.postId, postTable.id))
    console.log(posts)
    return res.json(posts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ messasge: "Invalid id" })
  try {
    const post = (await db.select().from(postTable)
      .where(eq(postTable.id, id))
      .leftJoin(upvoteCount, eq(upvoteCount.postId, postTable.id))
      .leftJoin(downvoteCount, eq(downvoteCount.postId, postTable.id)))[0]
    if (!post) return res.status(400).json({ message: "Post don't exist" })
    if (post.post.isDeleted) return res.status(401).json({ message: "Post deleted" })

    const comments = await db.select().from(commentTable)
      .where(eq(commentTable.postId, id))

    res.json({
      ...post.post,
      upvote: post.upvote_count?.upvoteCount ?? 0,
      downvote: post.downvote_count?.downvoteCount ?? 0,
      comments: comments.map(c => {
        if (!c.isDeleted) return c;
        else return { ...c, content: "[DELETED]", userId: null }
      })
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const createPost = async (req: AuthRequest, res: Response) => {

}

export const editPost = async (req: AuthRequest, res: Response) => {

}

export const deletePost = async (req: AuthRequest, res: Response) => {

}
