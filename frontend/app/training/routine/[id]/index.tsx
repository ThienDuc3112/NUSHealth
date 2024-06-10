import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'

const RoutineInfo = () => {
  const { id } = useLocalSearchParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => {
      const data = await getRoutineById(Number(id))
      return data
    },
    enabled: !!id
  })
  useEffect(() => {
    console.log(id, isLoading, data)
  }, [id, data, isLoading])

  return (
    <View>
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
    </View>
  )
}

export default RoutineInfo

const styles = StyleSheet.create({})
