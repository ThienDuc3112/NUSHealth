import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import RoutineCard from './routineCard'
import { getRoutineByPlanId } from '@/helpers/getRoutineByPlan'
import AddRoutineModal from './modal/addRoutineModal'

const RoutineList = ({ planId }: { planId?: number }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["routineList", planId],
    queryFn: ({ queryKey }) => {
      const [_, planId] = queryKey;
      return getRoutineByPlanId(Number(planId));
    },
  })

  const [openModal, setOpenModal] = useState(false)

  useFocusEffect(useCallback(() => { refetch() }, [planId]))

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
              renderItem={({ item }) => <RoutineCard
                id={item.routine.id}
                name={item.routine.name}
                muscles={item.targets}
              />}
            />
      }

      {!isNaN(Number(planId)) && <Button title='Add existing routine to this plan' />}

      <Button title='Create new routine' onPress={() => setOpenModal(true)} />

      <AddRoutineModal open={openModal} onClose={() => setOpenModal(false)} planId={planId} />
    </View>
  )
}

export default RoutineList

const styles = StyleSheet.create({})
