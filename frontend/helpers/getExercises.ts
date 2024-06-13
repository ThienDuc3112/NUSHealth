import { db } from "@/db/client";
import {
  exercisePhotoTable,
  exerciseTable,
  secondaryMuscleTable,
} from "@/schema/exerciseModel";
import { exercise } from "@/types/exercises";
import { eq } from "drizzle-orm";

export const getLocalExercises = async () : Promise<exercise[]> => {
  const res = await db
    .select()
    .from(exerciseTable)
    .leftJoin(
      exercisePhotoTable,
      eq(exerciseTable.id, exercisePhotoTable.exercisesId)
    )
    .leftJoin(
      secondaryMuscleTable,
      eq(exerciseTable.id, secondaryMuscleTable.exercisesId)
    );
  const exerciseDir: Record<number, exercise> = {};
  res.forEach((exercise) => {
    const { exercises: ex, exercise_photos, secondary_muscles } = exercise;
    if (!exerciseDir[ex.id]) {
      exerciseDir[ex.id] = { ...ex, secondaryMuscles: [], photos: [] };
    }
    if (exercise_photos) {
      exerciseDir[ex.id].photos.push(exercise_photos.url);
    }
    if (secondary_muscles) {
      exerciseDir[ex.id].secondaryMuscles.push(secondary_muscles.muscle);
    }
  });
  return Object.values(exerciseDir);
};

export const getExerciseById = async (id: number): Promise<exercise | undefined> => {
  const res = await db
    .select()
    .from(exerciseTable)
    .where(eq(exerciseTable.id, id))
    .leftJoin(
      exercisePhotoTable,
      eq(exerciseTable.id, exercisePhotoTable.exercisesId)
    )
    .leftJoin(
      secondaryMuscleTable,
      eq(exerciseTable.id, secondaryMuscleTable.exercisesId)
    );
  if (res.length == 0) return undefined;
  const photos: string[] = []
  const secondaryMuscles: string[] = []
  res.forEach(e => {
    if (e.exercise_photos) photos.push(e.exercise_photos.url)
    if (e.secondary_muscles) secondaryMuscles.push(e.secondary_muscles.muscle)
  })
  return {
    ...res[0].exercises,
    secondaryMuscles: secondaryMuscles as any,
    photos
  }
}
