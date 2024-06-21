import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'
import SetCard from '@/components/card/setCard'
import { exerciseState, workoutState } from '@/types/workoutState'

const Workout = () => {
  const { id } = useLocalSearchParams()
  const [workoutState, setWorkoutState] = useState<workoutState>({
    startTime: 0,
    endTime: 0,
    routine: undefined as any,
    activeExercise: 0,
    activeSet: 0,
    exercises: []
  })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => getRoutineById(Number(id)),
    enabled: !!id
  })

  useFocusEffect(useCallback(() => {
    refetch()
    setWorkoutState(prev => ({ ...prev, startTime: Date.now() }))
  }, []))

  const submitWorkout = useCallback((state: workoutState) => {
    console.log("submited")
  }, [])

  const nextExercise = useCallback((finished: boolean) => {
    setWorkoutState(prev => {
      if (prev.activeExercise >= prev.exercises.length) return prev;

      prev.exercises[prev.activeExercise].sets[prev.activeSet].finished = finished;
      prev.exercises[prev.activeExercise].sets[prev.activeSet].touched = true;
      do {
        prev.activeSet++;
        if (prev.activeSet >= prev.exercises[prev.activeExercise].sets.length) {
          prev.activeSet = 0
          prev.activeExercise++
        }
        if (prev.activeExercise >= prev.exercises.length) {
          submitWorkout(prev)
        }
        console.log("looped", prev.exercises[prev.activeExercise]?.sets, prev.activeSet, prev.activeExercise)
      } while (prev.exercises[prev.activeExercise]?.sets[prev.activeSet]?.finished);
      return prev
    })
  }, [workoutState])

  useEffect(() => {
    if (!!data) {
      const exercises: exerciseState[] = Array.from({ length: data.exercises.length },
        (_, idx) => ({
          exercise: data.exercises[idx],
          exIdx: idx,
          sets: Array.from({ length: data.exercises[idx].sets }, (_) => ({
            reps: data.exercises[idx].reps,
            kg: data.exercises[idx].kg || undefined,
            touched: false,
            finished: false
          }))
        })
      )
      setWorkoutState(prev => ({ ...prev, exercises, routine: { ...data.routine } }))
    }
  }, [data, isLoading, error])

  useEffect(() => {
    console.log(workoutState)
  }, [workoutState])

  const activeExercise = useMemo(() => {
    return workoutState.exercises?.[workoutState.activeExercise]
  }, [workoutState.activeSet, workoutState.activeExercise, workoutState])

  if (isLoading) return <View><Text>Loading...</Text></View>
  if (error) return <View><Text>{error.message}</Text></View>

  if (!activeExercise) return <View><Text>Submitting</Text></View>

  return (
    <View style={{ flex: 1 }}>
      <Text>Workout</Text>
      <View>
        <Text>
          {activeExercise.exercise.name}
        </Text>

        {
          activeExercise.exercise.name &&
          <Text>
            {
              activeExercise.exercise.instruction
            }
          </Text>
        }
      </View>

      <ScrollView style={{ flex: 1 }}>
        {
          activeExercise.sets.map((set, idx) => (<SetCard
            touched={set.touched}
            active={idx == workoutState.activeSet}
            key={idx}
            order={idx + 1}
            reps={set.reps}
            kg={set.kg ?? undefined}
            finished={set.finished}
          />))
        }
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", width: "100%" }}>
        <Button title='Skip set' onPress={() => nextExercise(false)} />
        <View style={styles.bottomData}>
          <Text>{activeExercise.sets[workoutState.activeSet].reps} Reps</Text>
          <Text>{activeExercise.sets[workoutState.activeSet].kg ?? "+"} Kg</Text>
        </View>
        <Button title='Next set' onPress={() => nextExercise(true)} />
      </View>
    </View>
  )
}

export default Workout

const styles = StyleSheet.create({
  bottomData: { flex: 1, gap: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }
})
