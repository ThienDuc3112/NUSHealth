import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { db } from '@/db/client'
import { routineTable } from '@/schema/routineModel'
import RoutineCard from './routineCard'

const RoutineList = ({ planId }: { planId?: number }) => {
  planId;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["routineList"],
    queryFn: async () => {
      return await db.select().from(routineTable);
    },
  })

  useFocusEffect(() => { refetch() })

  return (
    <View style={{ flex: 0 }}>
      <Text>RoutineList</Text>
      {
        data &&
        <FlatList
        style={{flex:0}}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <RoutineCard id={item.id} name={item.name} muscles={[]} />}
        />
      }
      <Text>{data && JSON.stringify(data, null, 2)}</Text>
    </View>
  )
}

export default RoutineList

const styles = StyleSheet.create({})
