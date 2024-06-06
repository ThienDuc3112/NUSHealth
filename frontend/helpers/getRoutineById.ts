import { db } from "@/db/client"
import { exercisePhotoTable, exerciseTable, secondaryMuscleTable } from "@/schema/exerciseModel"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"
import { routineTable } from "@/schema/routineModel"
import { exercise } from "@/types/exercises"
import { eq } from "drizzle-orm"

export const getRoutineById = async (routineId: number) => {
  try {
    const res = await db
      .select()
      .from(exerciseToRoutineTable)
      .where(eq(exerciseToRoutineTable.routineId, routineId))
      .innerJoin(
        routineTable,
        eq(exerciseToRoutineTable.routineId, routineTable.id)
      )
      .innerJoin(
        exerciseTable,
        eq(exerciseToRoutineTable.exerciseId, exerciseTable.id)
      )
      .leftJoin(
        exercisePhotoTable,
        eq(exerciseTable.id, exercisePhotoTable.exercisesId)
      )
      .leftJoin(
        secondaryMuscleTable,
        eq(exerciseTable.id, secondaryMuscleTable.exercisesId)
      );
    const exerciseDir: Record<number, exercise & typeof exerciseToRoutineTable.$inferSelect> = {};
    res.forEach((exercise) => {
      const { exercises: ex, exercise_photos, secondary_muscles, exercise_to_routine } = exercise;
      if (!exerciseDir[ex.id]) {
        exerciseDir[ex.id] = { ...ex, secondaryMuscles: [], photos: [], ...exercise_to_routine };
      }
      if (exercise_photos) {
        exerciseDir[ex.id].photos.push(exercise_photos.url);
      }
      if (secondary_muscles) {
        exerciseDir[ex.id].secondaryMuscles.push(secondary_muscles.muscle);
      }
    });
    return {
      routine: res[0].routines
    };
  } catch (error) {
    console.error(error)
    return null
  }
};
