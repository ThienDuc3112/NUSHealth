import { Request } from "express";
import { z } from "zod";
import { postTable } from "../model/forum/postModel";

export const postSchema = z.object({
  title: z.string().max(255, "Title too long, must be under 255 characters"),
  body: z.string()
})

export interface PostRequest extends Request {
  post: typeof postTable.$inferSelect
}
