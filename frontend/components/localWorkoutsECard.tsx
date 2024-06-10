import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { exercise } from '@/types/exercises'
import { Link } from 'expo-router'
import ExerciseCardBase from './exerciseCardBase'

const LocalWorkoutECard = ({ e }: { e: exercise }) => {
  return (
    <Link href={`/account/localWorkouts/${e.id}`} asChild>
      <TouchableWithoutFeedback onPress={() => console.log("Clicked")}>
        <View>
          <ExerciseCardBase e={e} />
        </View>
      </TouchableWithoutFeedback>
    </Link>
  )
}

export default LocalWorkoutECard

const styles = StyleSheet.create({
  container: {}
})
