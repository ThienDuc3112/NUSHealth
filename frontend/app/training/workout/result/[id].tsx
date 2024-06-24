import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/db/client'
import { historyTable } from '@/schema/historyModel'
import { historySetTable } from '@/schema/historySetModel'
import { eq } from 'drizzle-orm'

const ResultPage = () => {
  const { id } = useLocalSearchParams()

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      return db
        .select()
        .from(historyTable)
        .leftJoin(
          historySetTable,
          eq(historySetTable.historyKey, historyTable.id)
        )
        .where(eq(historyTable.id, Number(id)))
    },
    enabled: !!id
  })

  useFocusEffect(() => { refetch() })

  if (isLoading) return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
  if (error) return (
    <View>
      <Text>{error.message}</Text>
    </View>
  )

  return (
    <View>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  )
}

export default ResultPage

const styles = StyleSheet.create({})
