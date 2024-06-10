import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getExerciseById } from '@/helpers/getExercises'

const SetRep = () => {
  const { exId } = useLocalSearchParams()
  const queryFn = useCallback(() => getExerciseById(Number(exId)), [exId])
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercise", exId],
    queryFn,
    enabled: !!exId
  })

  useFocusEffect(() => {refetch()})

  return (
    <View>
      <Text>SetRep</Text>
      <Text>{exId}</Text>
      {isLoading ?
        <Text>Loading...</Text> :
        error ?
          <Text>{error.message}</Text> :
          <Text>{JSON.stringify(data, null, 2)}</Text>
      }
    </View>
  )
}

export default SetRep

const styles = StyleSheet.create({})
