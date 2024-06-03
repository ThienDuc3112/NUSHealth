import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'

const RoutineInfo = () => {
  const {id} = useLocalSearchParams()
  const {data, isLoading, error} = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => {
      const data = await getRoutineById(Number(id))
      console.log(data)
      return data
    },
    enabled: !!id
  })
  useEffect(() => {
    console.log(isLoading, data)
  }, [id, data, isLoading])

  return (
    <View>
      <Text>RoutineInfo</Text>
      <Text>Routine id: {id}</Text>
      <Button title='Add exercise to routine' />
    </View>
  )
}

export default RoutineInfo

const styles = StyleSheet.create({})
