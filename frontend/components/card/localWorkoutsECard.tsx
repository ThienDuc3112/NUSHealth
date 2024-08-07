import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { exercise } from '@/types/exercises'
import { Link } from 'expo-router'
import ExerciseCardBase from './exerciseCardBase'

const LocalWorkoutECard = ({ e }: { e: exercise & { reps?: number, sets?: number, kg?: number | null } }) => {
  return (
    <Link href={`/training/exercise/${e.id}`} asChild>
      <TouchableWithoutFeedback>
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
