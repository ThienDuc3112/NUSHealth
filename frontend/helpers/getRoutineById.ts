import { db } from "@/db/client"
import { exercisePhotoTable, exerciseTable, targetedMuscleTable } from "@/schema/exerciseModel"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"
import { routineTable } from "@/schema/routineModel"
import { exercise } from "@/types/exercises"
import { routine } from "@/types/routine"
import { eq } from "drizzle-orm"

export const getRoutineById = async (routineId: number): Promise<routine> => {
  console.log("===== Helper getRoutineById called =====")
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
      targetedMuscleTable,
      eq(exerciseTable.id, targetedMuscleTable.exercisesId)
    )
    .orderBy(exerciseToRoutineTable.order);
  const exerciseDir: Record<number, exercise & typeof exerciseToRoutineTable.$inferSelect> = {};
  routinesExercises.forEach((exercise) => {
    const { exercises: ex, exercise_photos, targeted_muscles, exercise_to_routine: e2r } = exercise;
    if (!exerciseDir[e2r.id]) {
      exerciseDir[e2r.id] = { ...ex, secondaryMuscles: [], photos: [], ...e2r };
    }
    if (exercise_photos) {
      exerciseDir[e2r.id].photos.push(exercise_photos.url);
    }
    if (targeted_muscles) {
      exerciseDir[e2r.id].secondaryMuscles.push(targeted_muscles.muscle);
    }
  });
  return {
    routine: routine[0],
    exercises: Object.values(exerciseDir)
  }
};
