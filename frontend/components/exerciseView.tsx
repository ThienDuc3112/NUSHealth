import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { exercise } from '@/types/exercises'

const ExerciseView = ({e} : {e: exercise}) => {
  return (
    <View style={styles.container}>
      <Text>ExerciseCard</Text>
      <Text>{JSON.stringify(e, null, 2)}</Text>
    </View>
  )
}

export default ExerciseView

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    margin: 10,
    borderRadius: 5
  }
})
