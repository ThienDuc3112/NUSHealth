import { exerciseTable, musclesEnum } from "@/schema/exerciseModel";

export type exercise = typeof exerciseTable.$inferSelect & {
  secondaryMuscles: (typeof musclesEnum)[number][];
  photos: string[];
};
