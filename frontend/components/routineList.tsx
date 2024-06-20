import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useFocusEffect } from 'expo-router'
import RoutineCard from '@/components/card/routineCard'
import { getRoutineByPlanId } from '@/helpers/getRoutineByPlan'
import AddRoutineModal from '@/components/modal/addRoutineModal'
import CreateRoutineModal from '@/components/modal/createRoutineModal'

const RoutineList = ({ planId }: { planId?: number }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["plan", planId],
    queryFn: ({ queryKey }) => {
      const [_, planId] = queryKey;
      return getRoutineByPlanId(Number(planId));
    },
  })

  const [openNewRoutineModal, setOpenNewRoutineModal] = useState(false)
  const [openAddRoutineModal, setOpenAddRoutineModal] = useState(false)

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
              renderItem={({ item }) =>
                <Link href={`/training/routine/${item.routine.id}`} asChild>
                  <TouchableOpacity>
                    <RoutineCard
                      id={item.routine.id}
                      name={item.routine.name}
                      muscles={item.targets}
                    />
                  </TouchableOpacity>
                </Link>
              }
            />
      }

      {!isNaN(Number(planId)) && <Button title='Add existing routine to this plan' onPress={() => setOpenAddRoutineModal(true)} />}

      <Button title='Create new routine' onPress={() => setOpenNewRoutineModal(true)} />

      <CreateRoutineModal open={openNewRoutineModal} onClose={() => setOpenNewRoutineModal(false)} planId={planId} />
      <AddRoutineModal
        open={openAddRoutineModal}
        onClose={() => {
          setOpenAddRoutineModal(false)
          refetch()
        }}
        planId={planId!}
      />
    </View>
  )
}

export default RoutineList

const styles = StyleSheet.create({})
