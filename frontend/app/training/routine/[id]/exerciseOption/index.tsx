import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalExercises } from '@/helpers/getExercises'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router'
import RoutineExerciseCard from '@/components/card/routineExerciseCard'

const ExerciseList = () => {
  const [exerciseName, setExerciseName] = useState("")
  const { id } = useLocalSearchParams()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercises"],
    queryFn: getLocalExercises
  })

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <View style={{ flex: 1 }}>
      <Text>Choose an exercise</Text>

      <TextInput
        value={exerciseName}
        onChangeText={(text) => setExerciseName(text)}
        placeholder='Name of exercise'
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
              renderItem={({ item: e }) => <RoutineExerciseCard id={id as string} e={e} />}
            /> :
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
