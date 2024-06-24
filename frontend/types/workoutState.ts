import { exercise } from "./exercises"
import { routine } from "./routine"

export type workoutState = {
  startTime: number
  endTime: number
  routine: routine["routine"]
  exercises: exerciseState[]
  activeExercise: number
  activeSet: number
}

export type exerciseState = {
  exIdx: number
  exercise: exercise
  sets: setsState[]
}

export type setsState = {
  reps: number
  kg?: number
  touched: boolean
  finished: boolean
}
