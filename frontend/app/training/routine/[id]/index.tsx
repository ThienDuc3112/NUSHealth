import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'
import LocalWorkoutECard from '@/components/card/localWorkoutsECard'

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
      <FlatList
        data={data?.exercises || []}
        renderItem={({ item }) => (
          <LocalWorkoutECard e={{
            ...item,
          }} />
        )
        }
      />
      <Link href={`/training/routine/${id}/exercise`} asChild>
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
