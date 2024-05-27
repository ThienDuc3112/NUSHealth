import { z } from "zod";

export const publicImageSchema = z.string().max(4).min(4);
