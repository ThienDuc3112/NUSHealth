import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'

const RoutineInfo = () => {
  const { id } = useLocalSearchParams()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => getRoutineById(Number(id)),
    enabled: !!id
  })

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <ScrollView>
      <Text>RoutineInfo</Text>
      <Text>Routine id: {id}</Text>
      <Text>Data: {
        isLoading ?
          "Loading..." : error ?
            `${error.name} ${error.message}\nCause: ${error.cause}` : JSON.stringify(data, null, 2)
      }
      </Text>
      <Link href={`/training/routine/${id}/exerciseOption`} asChild>
        <Button title='Add exercise to routine' />
      </Link>
      <View style={{ marginTop: 8 }}>
        <Link href={`/training/workout/${id}`} asChild>
          <Button title='Workout' />
        </Link>
      </View>
    </ScrollView>
  )
}

export default RoutineInfo

const styles = StyleSheet.create({})
