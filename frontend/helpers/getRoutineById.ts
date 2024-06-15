import { db } from "@/db/client"
import { exercisePhotoTable, exerciseTable, secondaryMuscleTable } from "@/schema/exerciseModel"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"
import { routineTable } from "@/schema/routineModel"
import { exercise } from "@/types/exercises"
import { routine } from "@/types/routine"
import { eq } from "drizzle-orm"

export const getRoutineById = async (routineId: number): Promise<routine> => {
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
  const exerciseDir: Record<number, exercise & typeof exerciseToRoutineTable.$inferSelect> = {};
  console.log("Helper getRoutineById routinesExercises.length: ", routinesExercises.length )
  routinesExercises.forEach((exercise) => {
    const { exercises: ex, exercise_photos, secondary_muscles, exercise_to_routine: e2r } = exercise;
    console.log("Helper getRoutineById exercise: ", JSON.stringify(exercise, null, 2))
    if (!exerciseDir[e2r.id]) {
      exerciseDir[e2r.id] = { ...ex, secondaryMuscles: [], photos: [], ...e2r };
    }
    if (exercise_photos) {
      exerciseDir[e2r.id].photos.push(exercise_photos.url);
    }
    if (secondary_muscles) {
      exerciseDir[e2r.id].secondaryMuscles.push(secondary_muscles.muscle);
    }
    console.log("Helper getRoutineById read secondary_muscles succeed")
  });
  console.log("Helper getRoutineById succeed")
  return {
    routine: routine[0],
    exercises: Object.values(exerciseDir)
  }
};
