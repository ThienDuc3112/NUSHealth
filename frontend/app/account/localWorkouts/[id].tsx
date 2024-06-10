import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ExerciseInfo = () => {
  const {id} = useLocalSearchParams()

  return (
    <View>
      <Text>ExerciseInfo</Text>
      <Text>{id}</Text>
    </View>
  )
}

export default ExerciseInfo

const styles = StyleSheet.create({})
