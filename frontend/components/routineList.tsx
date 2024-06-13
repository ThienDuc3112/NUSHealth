import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import RoutineCard from './routineCard'
import { getRoutineByPlanId } from '@/helpers/getRoutineByPlan'

const RoutineList = ({ planId }: { planId?: number }) => {
  planId;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["routineList"],
    queryFn: async () => getRoutineByPlanId(),
  })

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <View style={{ flex: 0 }}>
      <Text>RoutineList</Text>
      {
        isLoading ?
          <Text>Loading...</Text> :
          error ?
            <Text>{`${error.name} ${error.message}\nCause: ${error.cause}`}</Text> :
            <FlatList
              style={{ flex: 0 }}
              data={data}
              keyExtractor={(item) => item.routine.id.toString()}
              renderItem={({ item }) => <RoutineCard id={item.routine.id} name={item.routine.name} muscles={item.targets} />}
            />
      }
    </View>
  )
}

export default RoutineList

const styles = StyleSheet.create({})
