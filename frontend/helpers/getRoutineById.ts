import { db } from "@/db/client"
import { exerciseTable } from "@/schema/exerciseModel"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"
import { routineTable } from "@/schema/routineModel"
import { eq } from "drizzle-orm"

export const getRoutineById = async (id: number) => {
  const data = await db
    .select()
    .from(routineTable)
    .where(eq(routineTable.id, Number(id)))
    .innerJoin(exerciseToRoutineTable, eq(exerciseToRoutineTable.routineId, routineTable.id))
    .innerJoin(exerciseTable, eq(exerciseTable.id, exerciseToRoutineTable.exerciseId))
  return data
}
