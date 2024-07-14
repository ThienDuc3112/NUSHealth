import { Button, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'
import SetCard from '@/components/card/setCard'
import { exerciseState, workoutState } from '@/types/workoutState'
import { db } from '@/db/client'
import { historyTable } from '@/schema/historyModel'
import { historySetTable } from '@/schema/historySetModel'

const { width: viewportWidth } = Dimensions.get("window")

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
  const listRef = useRef<FlatList<exerciseState>>()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => getRoutineById(Number(id)),
    enabled: !!id
  })

  useFocusEffect(useCallback(() => {
    refetch()
    setWorkoutState(prev => ({ ...prev, startTime: Date.now() }))
  }, []))

  const submitWorkout = useCallback(async (state: workoutState) => {
    const history = (await db.insert(historyTable).values({
      startTime: new Date(state.startTime),
      endTime: new Date()
    }).returning())[0]
    const insertedValue: (typeof historySetTable.$inferInsert)[] = []
    state.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (set.finished) insertedValue.push({
          kg: set.kg,
          reps: set.reps,
          historyKey: history.id,
          exerciseId: exercise.exercise.id
        })
      })
    })
    const res = await db.insert(historySetTable).values(insertedValue).returning()
    console.log("res", res)
    router.replace(`/training/workout/result/${history.id}`)
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
      } while (prev.exercises[prev.activeExercise]?.sets[prev.activeSet]?.finished);

      console.log(prev.activeExercise < prev.exercises.length)
      if (prev.activeExercise < prev.exercises.length) {
        console.log(prev)
        listRef.current?.scrollToIndex({ index: prev.activeExercise, animated: true })
      }
      return { ...prev }
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
    console.log("workoutState: ", workoutState)
  }, [workoutState, workoutState.activeSet, workoutState.activeExercise])

  const activeExercise = useMemo(() => {
    return workoutState.exercises?.[workoutState.activeExercise]
  }, [workoutState.activeSet, workoutState.activeExercise, workoutState])

  if (isLoading) return <View><Text>Loading...</Text></View>
  if (error) return <View><Text>{error.message}</Text></View>

  if (!activeExercise) return <View><Text>Submitting</Text></View>

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        pagingEnabled
        ref={listRef as LegacyRef<FlatList<exerciseState>>}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='center'
        data={workoutState.exercises}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item: exercise }) => (
          <ScrollView style={{ flex: 1, width: viewportWidth }}>
            <Image
              source={{ uri: exercise.exercise.photos[0] }}
              style={{
                width: viewportWidth - 100,
                height: viewportWidth - 100,
                margin: "auto",
                marginTop: 10
              }}
            />
            {
              exercise.sets.map((set, idx) => (
                <TouchableOpacity key={idx} onPress={() => {
                  setWorkoutState(prev => ({
                    ...prev, activeSet: idx, activeExercise: exercise.exIdx
                  }))
                }}>
                  <SetCard
                    touched={set.touched}
                    active={idx == workoutState.activeSet && exercise.exIdx == workoutState.activeExercise}
                    order={idx + 1}
                    reps={set.reps}
                    kg={set.kg ?? undefined}
                    finished={set.finished}
                  />
                </TouchableOpacity>))
            }
          </ScrollView>
        )}
      />

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
  bottomData: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})
