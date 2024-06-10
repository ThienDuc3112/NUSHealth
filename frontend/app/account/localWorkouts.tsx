import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalExercises } from '@/helpers/getExercises'
import { Link, useFocusEffect } from 'expo-router'

const LocalWorkout = () => {
  const [exerciseName, setExerciseName] = useState("")
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercise"],
    queryFn: getLocalExercises
  })

  useFocusEffect(() => { refetch() })

  return (
    <View style={{flex: 1}}>
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
      {isLoading ?
        <Text>Loading...</Text> :
        data ?
          <ScrollView style={{flex: 1}}>
            <Text>{JSON.stringify(data, null, 2)}</Text>
          </ScrollView> :
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
    marginHorizontal: 10,
    borderRadius: 10
  }
})
