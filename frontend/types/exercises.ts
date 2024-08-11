import { exerciseTable } from "@/schema/exerciseModel";

export type exercise = typeof exerciseTable.$inferSelect & {
  targetedMuscles: string[];
  photos: string[];
};
