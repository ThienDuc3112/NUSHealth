import { routineTable } from "@/schema/routineModel"
import { exercise } from "./exercises"
import { exerciseToRoutineTable } from "@/schema/exerciseToRoutineModel"

export type routine = {
  routine: typeof routineTable.$inferSelect
  exercises: (exercise & typeof exerciseToRoutineTable.$inferSelect)[]
}
