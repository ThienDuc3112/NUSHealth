import { exerciseTable } from "@/schema/exerciseModel";

export type exercise = typeof exerciseTable.$inferSelect & {
  secondaryMuscles: string[];
  photos: string[];
};
