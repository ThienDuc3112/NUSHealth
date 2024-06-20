import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { exercise } from '@/types/exercises'
import { Link } from 'expo-router'
import ExerciseCardBase from './exerciseCardBase'

const RoutineExerciseCard = ({ e, id }: { e: exercise, id: string }) => {
  return (
    <Link href={`/training/routine/${id}/exerciseOption/${e.id}`} asChild>
      <TouchableWithoutFeedback>
        <View>
          <ExerciseCardBase e={e} />
        </View>
      </TouchableWithoutFeedback>
    </Link>
  )
}

export default RoutineExerciseCard

const styles = StyleSheet.create({
  container: {}
})
