import { db } from "@/db/client";
import {
  exercisePhotoTable,
  exerciseTable,
  targetedMuscleTable,
} from "@/schema/exerciseModel";
import { exercise } from "@/types/exercises";
import { eq } from "drizzle-orm";

export const getLocalExercises = async (): Promise<exercise[]> => {
  console.log("===== Helper getLocalExercises called =====");
  const res = await db
    .select()
    .from(exerciseTable)
    .leftJoin(
      exercisePhotoTable,
      eq(exerciseTable.id, exercisePhotoTable.exercisesId)
    )
    .leftJoin(
      targetedMuscleTable,
      eq(exerciseTable.id, targetedMuscleTable.exercisesId)
    );
  const exerciseDir: Record<number, exercise> = {};
  res.forEach((exercise) => {
    const { exercises: ex, exercise_photos, targeted_muscles } = exercise;
    if (!exerciseDir[ex.id]) {
      exerciseDir[ex.id] = { ...ex, targetedMuscles: [], photos: [] };
    }
    if (exercise_photos) {
      exerciseDir[ex.id].photos.push(exercise_photos.url);
    }
    if (targeted_muscles) {
      exerciseDir[ex.id].targetedMuscles.push(targeted_muscles.muscle);
    }
  });
  return Object.values(exerciseDir);
};

export const getExerciseById = async (
  id: number
): Promise<exercise | undefined> => {
  console.log("===== Helper getExerciseById called =====");
  const res = await db
    .select()
    .from(exerciseTable)
    .where(eq(exerciseTable.id, id))
    .leftJoin(
      exercisePhotoTable,
      eq(exerciseTable.id, exercisePhotoTable.exercisesId)
    )
    .leftJoin(
      targetedMuscleTable,
      eq(exerciseTable.id, targetedMuscleTable.exercisesId)
    );
  if (res.length == 0) throw new Error("Exercise don't exist");
  const photos: string[] = [];
  const secondaryMuscles: string[] = [];
  res.forEach((e) => {
    if (e.exercise_photos) photos.push(e.exercise_photos.url);
    if (e.targeted_muscles) secondaryMuscles.push(e.targeted_muscles.muscle);
  });
  return {
    ...res[0].exercises,
    targetedMuscles: secondaryMuscles as any,
    photos,
  };
};
