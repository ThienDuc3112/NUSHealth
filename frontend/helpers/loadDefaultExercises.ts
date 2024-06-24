import exercises from "@/assets/exercisesFull.json"
import { db } from "@/db/client"
import { exercisePhotoTable, exerciseTable, secondaryMuscleTable } from "@/schema/exerciseModel"

export const loadDefaultExercises = async () => {
  const insertedExercises = await db
    .insert(exerciseTable)
    .values(exercises.map(e => {
      return {
        name: e.name,
        equipment: e.equipment,
        initialId: e.id,
        bodyPart: e.bodyPart,
        target: e.target,
        instruction: e.instructions.join("\n"),
        isDefaultExercise: true
      }
    })).returning({ id: exerciseTable.id, initialId: exerciseTable.initialId })
  const setInsertedEx = new Map<string | null, number>()
  insertedExercises.forEach(ie => setInsertedEx.set(ie.initialId, ie.id))
  const secondaryMuscles: Array<typeof secondaryMuscleTable.$inferInsert> = []
  exercises.forEach(e => {
    e.secondaryMuscles.forEach(muscle => {
      secondaryMuscles.push({
        exercisesId: setInsertedEx.get(e.id)!, muscle
      })
    })
  })
  await db.insert(secondaryMuscleTable).values(secondaryMuscles)
  await db.insert(exercisePhotoTable).values(insertedExercises.map(ie => {
    return {
      exercisesId: ie.id,
      url: `https://raw.githubusercontent.com/ThienDuc3112/NUSHealth/master/backend/public/gif/${ie.initialId}.gif`
    }
  }))
}
