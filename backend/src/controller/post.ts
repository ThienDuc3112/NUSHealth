import { Request, Response } from "express";
import { AuthRequest } from "../types/auth";
import { db } from "../../db/db";
import { postTable } from "../model/forum/postModel";
import { count, eq } from "drizzle-orm";
import { commentTable } from "../model/forum/commentModel";
import { votingTable } from "../model/forum/upvoteDownvoteModel";
import { postSchema } from "../types/post";

const upvoteCountSQ = db
  .select({
    postId: votingTable.postId,
    upvoteCount: count().as("upvote_count")
  })
  .from(votingTable)
  .where(eq(votingTable.upvote, true))
  .groupBy(votingTable.postId)
  .as("upvote_count")

const downvoteCountSQ = db
  .select({
    postId: votingTable.postId,
    downvoteCount: count().as("downvote_count")
  })
  .from(votingTable)
  .where(eq(votingTable.upvote, false))
  .groupBy(votingTable.postId)
  .as("downvote_count")

export const getAllPost = async (_: Request, res: Response) => {
  try {
    const commentCountSQ = db
      .select({
        postId: commentTable.postId,
        commentCount: count().as("comment_count")
      })
      .from(commentTable)
      .groupBy(commentTable.postId)
      .as("comment_count")

    const posts = await db.select().from(postTable)
      .where(eq(postTable.isDeleted, false))
      .leftJoin(upvoteCountSQ, eq(upvoteCountSQ.postId, postTable.id))
      .leftJoin(downvoteCountSQ, eq(downvoteCountSQ.postId, postTable.id))
      .leftJoin(commentCountSQ, eq(commentCountSQ.postId, postTable.id))
    console.log(posts)
    return res.json(posts.map(post => ({
      ...post.post,
      upvote: post.upvote_count?.upvoteCount || 0,
      downvote: post.downvote_count?.downvoteCount || 0,
      commentCount: post.comment_count?.commentCount || 0
    })))
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
      .leftJoin(upvoteCountSQ, eq(upvoteCountSQ.postId, postTable.id))
      .leftJoin(downvoteCountSQ, eq(downvoteCountSQ.postId, postTable.id)))[0]
    if (!post) return res.status(400).json({ message: "Post don't exist" })
    if (post.post.isDeleted) return res.status(401).json({ message: "Post deleted" })

    const comments = await db.select().from(commentTable)
      .where(eq(commentTable.postId, id))

    return res.json({
      ...post.post,
      upvote: post.upvote_count?.upvoteCount || 0,
      downvote: post.downvote_count?.downvoteCount || 0,
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
  if (!req.user) return res.status(401).json({ message: "You're not login" })
  const body = await postSchema.safeParseAsync(req.body)
  if (!body.success) return res.status(400).json({ message: "Incorrect body form", error: body.error });
  try {
    const post = await db.insert(postTable).values({
      ...body.data,
      userId: req.user.id,
    }).returning({ id: postTable.id })
    res.json({ id: post[0].id })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const editPost = async (req: AuthRequest, res: Response) => {

}

export const deletePost = async (req: AuthRequest, res: Response) => {

}
