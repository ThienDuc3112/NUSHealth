import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalExercises } from '@/helpers/getExercises'
import { useFocusEffect } from 'expo-router'

const ExerciseList = () => {
  const [exerciseName, setExerciseName] = useState("")
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercise"],
    queryFn: getLocalExercises
  })

  useFocusEffect(() => { refetch() })

  return (
    <View>
      <Text>Choose an exercise</Text>
      <TextInput
        value={exerciseName}
        onChangeText={(text) => setExerciseName(text)}
        placeholder='Name of exercise'
        style={styles.textInput}
      />
      {isLoading ?
        <Text>Loading...</Text> :
        data ?
          <Text>{JSON.stringify(data, null, 2)}</Text> :
          <Text>{error?.message}</Text>
      }
    </View>
  )
}

export default ExerciseList

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10
  }
})
