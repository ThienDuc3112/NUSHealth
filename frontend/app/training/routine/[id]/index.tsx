import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'

const RoutineInfo = () => {
  const { id } = useLocalSearchParams()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => {
      const data = await getRoutineById(Number(id))
      return data
    },
    enabled: !!id
  })

  useFocusEffect(() => {refetch()})

  useEffect(() => {
    console.log(id, isLoading, data)
  }, [id, data, isLoading])

  return (
    <ScrollView>
      <Text>RoutineInfo</Text>
      <Text>Routine id: {id}</Text>
      <Text>Data: {
        isLoading ?
          "Loading..." : error ?
            error.message : JSON.stringify(data, null, 2)
      }
      </Text>
      <Link href={`/training/routine/${id}/exerciseOption`} asChild>
        <Button title='Add exercise to routine' />
      </Link>
    </ScrollView>
  )
}

export default RoutineInfo

const styles = StyleSheet.create({})
