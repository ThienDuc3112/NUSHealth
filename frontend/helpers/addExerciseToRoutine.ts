import { db } from "@/db/client"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"
import { count, eq } from "drizzle-orm"

export const addExerciseToRoutine = async (
  exId: number,
  routineId: number,
  sets: number,
  reps: number,
  kg: number | undefined
): Promise<boolean> => {
  console.log("===== Helper addExerciseToRoutine called =====")
  try {
    const getOrder = await db
      .select({ value: count() })
      .from(exerciseToRoutineTable)
      .where(eq(exerciseToRoutineTable.routineId, routineId))
    const order = getOrder[0].value
    await db.insert(exerciseToRoutineTable).values({
      exerciseId: exId,
      routineId, sets, reps, kg, order
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }

}
