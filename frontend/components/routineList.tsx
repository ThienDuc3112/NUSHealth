import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { db } from '@/db/client'
import { routineTable } from '@/schema/routineModel'

const RoutineList = ({ planId }: { planId: number }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["routineList"],
    queryFn: async () => {
      return await db.select().from(routineTable);
    },
  })

  useFocusEffect(() => { refetch() })

  return (
    <ScrollView style={{flex: 0}}>
      <Text>RoutineList</Text>
      <Text>{data && JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  )
}

export default RoutineList

const styles = StyleSheet.create({})
