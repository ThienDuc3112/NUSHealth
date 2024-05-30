import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalExercises } from '@/helpers/getExercises'

const CreateNewRoutine = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: getLocalExercises
  })

  if (isLoading) return <Text>
    Fetching exercises...
  </Text>;
  if (error) return <Text>Error: {JSON.stringify(error, null, 2)}</Text>
  return (
    <FlatList
      data={data}
      keyExtractor={(_, i) => `${i}`}
      renderItem={({ item: exercise }) =>
        <TouchableOpacity onPress={() => console.log(exercise.id)}>
          <View style={styles.exerciseBox}>
            <Text>{exercise.name}</Text>
            <Text>{exercise.target}</Text>
            <Text>{exercise.equipment}</Text>
          </View>
        </TouchableOpacity>
      }
    />
  )
}

export default CreateNewRoutine

const styles = StyleSheet.create({
  exerciseBox: {
    backgroundColor: "#b0b0b0",
    marginVertical: 10,
    padding: 10,
    borderRadius: 15
  },
})
