import { db } from "@/db/client";
import { exerciseTable, musclesEnum } from "@/schema/exerciseModel";
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel";
import { routineTable } from "@/schema/routineModel";
import { routineToPlanTable } from "@/schema/routineToPlanModel";
import { routine } from "@/types/routine";
import { eq, getTableColumns } from "drizzle-orm";

export const getRoutineByPlanId = async (planId?: number): Promise<({ routine: routine["routine"], targets: (typeof musclesEnum[number])[], exercisesCount: number })[]> => {
  console.log(`===== Helper getRoutineByPlanId called =====`)
  if (!planId && planId != 0) {
    const routines = await db
      .select({
        routine: getTableColumns(routineTable),
        target: exerciseTable.target
      })
      .from(routineTable)
      .leftJoin(exerciseToRoutineTable, eq(routineTable.id, exerciseToRoutineTable.routineId))
      .leftJoin(exerciseTable, eq(exerciseToRoutineTable.exerciseId, exerciseTable.id))
    const temp: Record<number, { routine: routine["routine"], targets: (typeof musclesEnum[number])[], exercisesCount: number }> = {}
    routines.forEach(r => {
      if (!temp[r.routine.id]) temp[r.routine.id] = {
        routine: r.routine,
        exercisesCount: 0,
        targets: []
      }
      if (r.target != null) {
        temp[r.routine.id].exercisesCount++
        if (!temp[r.routine.id].targets.some(target => target == r.target)) temp[r.routine.id].targets.push(r.target)
      }
    })
    return Object.values(temp);
  } else {
    const routines = await db
      .select({
        routine: getTableColumns(routineTable),
        target: exerciseTable.target
      })
      .from(routineToPlanTable)
      .innerJoin(routineTable, eq(routineToPlanTable.routineId, routineTable.id))
      .where(eq(routineToPlanTable.planId, planId))
      .leftJoin(exerciseToRoutineTable, eq(routineTable.id, exerciseToRoutineTable.routineId))
      .leftJoin(exerciseTable, eq(exerciseToRoutineTable.exerciseId, exerciseTable.id))
    const temp: Record<number, { routine: routine["routine"], targets: (typeof musclesEnum[number])[], exercisesCount: number }> = {}
    routines.forEach(r => {
      if (!temp[r.routine.id]) temp[r.routine.id] = {
        routine: r.routine,
        exercisesCount: 0,
        targets: []
      }
      if (r.target != null) {
        temp[r.routine.id].exercisesCount++
        if (!temp[r.routine.id].targets.some(target => target == r.target)) temp[r.routine.id].targets.push(r.target)
      }
    })
    return Object.values(temp);
  }
}
