import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalExercises } from '@/helpers/getExercises'
import { Link, useFocusEffect } from 'expo-router'
import LocalWorkoutECard from '@/components/card/localWorkoutsECard'

const LocalWorkout = () => {
  const [exerciseName, setExerciseName] = useState("")
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercises"],
    queryFn: getLocalExercises
  })
  const [actualData, setActualData] = useState<typeof data>()

  useFocusEffect(useCallback(() => { refetch() }, []))
  useEffect(() => { setActualData(data) }, [data, isLoading, error])

  const ref = useRef<NodeJS.Timeout>()

  useEffect(() => {
    console.log(exerciseName)
    clearTimeout(ref.current)
    ref.current = setTimeout(() => {
      console.log("Checking");
      if (!data) return;
      if (exerciseName == '')
        setActualData(data);
      else {
        setActualData(data.filter(e => e.name.toLowerCase().includes(exerciseName.toLowerCase().trim())))
      }
    }, 200)
  }, [exerciseName])

  return (
    <View style={{ flex: 1 }}>
      <Text>All local Workouts</Text>
      <TextInput
        value={exerciseName}
        onChangeText={(text) => setExerciseName(text)}
        placeholder='Find a workout'
        style={styles.textInput}
      />
      <Link href={"/training/exercise/new"} asChild>
        <Button title='Add new exercise' />
      </Link>
      {
        isLoading ?
          <Text>Loading...</Text> :
          actualData ?
            <FlatList
              data={actualData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: e }) => <LocalWorkoutECard e={e} />}
            /> :
            <Text>{error?.message}</Text>

      }
    </View>
  )
}

export default LocalWorkout

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10
  }
})
