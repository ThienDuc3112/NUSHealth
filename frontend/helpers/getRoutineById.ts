import { db } from "@/db/client"
import { exercisePhotoTable, exerciseTable, secondaryMuscleTable } from "@/schema/exerciseModel"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"
import { routineTable } from "@/schema/routineModel"
import { exercise } from "@/types/exercises"
import { eq } from "drizzle-orm"

export const getRoutineById = async (routineId: number) => {
  try {
    const routine = await db.select().from(routineTable).where(eq(routineTable.id, routineId))
    const routinesExercises = await db
      .select()
      .from(exerciseToRoutineTable)
      .where(eq(exerciseToRoutineTable.routineId, routineId))
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
      )
      .orderBy(exerciseToRoutineTable.order);
    console.log("Helper getRoutineById: ", JSON.stringify(routinesExercises, null, 2))
    const exerciseDir: Record<number, exercise & typeof exerciseToRoutineTable.$inferSelect> = {};
    routinesExercises.forEach((exercise) => {
      const { exercises: ex, exercise_photos, secondary_muscles, exercise_to_routine: e2r } = exercise;
      if (!exerciseDir[e2r.id]) {
        exerciseDir[e2r.id] = { ...ex, secondaryMuscles: [], photos: [], ...e2r };
      }
      if (exercise_photos) {
        exerciseDir[ex.id].photos.push(exercise_photos.url);
      }
      if (secondary_muscles) {
        exerciseDir[ex.id].secondaryMuscles.push(secondary_muscles.muscle);
      }
    });
    return {
      routine,
      exercises: Object.values(exerciseDir)
    };
  } catch (error) {
    console.error(error)
    return error 
  }
};
