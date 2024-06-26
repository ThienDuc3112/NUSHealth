import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
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

  useFocusEffect(useCallback(() => { refetch() }, []))

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
          data ?
            <FlatList
              data={data}
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
