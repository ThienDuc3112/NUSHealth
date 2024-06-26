import { z } from "zod";

export const postSchema = z.object({
  title: z.string().max(255, "Title too long, must be under 255 characters"),
  body: z.string()
})
