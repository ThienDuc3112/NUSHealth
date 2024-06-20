import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ModalBase } from '@/components/modal/modalBase'
import { useQuery } from '@tanstack/react-query'
import { getRoutineByPlanId } from '@/helpers/getRoutineByPlan'
import RoutineCard from '@/components/card/routineCard'
import { GlobalStyles } from '@/constants/styles'
import { db } from '@/db/client'
import { routineToPlanTable } from '@/schema/routineToPlanModel'

const AddRoutineModal = ({ open, onClose, planId }: { open: boolean, onClose: () => void, planId: number }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["plan", undefined],
    queryFn: () => getRoutineByPlanId(),
    enabled: !!planId
  })

  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    if (planId === undefined)
      onClose()
    if (open) refetch()
  }, [planId, open])

  const addRoutine = useCallback(async (routineId: number) => {
    try {
      await db.insert(routineToPlanTable).values({
        planId, routineId
      })
      setErrMsg("")
      onClose()
    } catch (error) {
      console.error(error)
      setErrMsg("Cannot add routine to plan, check if this routine already in the plan")
    }
  }, [planId])

  return (
    <ModalBase open={open} onClose={onClose}>
      <View style={[GlobalStyles.modalView, styles.modalView]}>
        <TextInput placeholder='Search for a routine' />
        {
          isLoading ?
            <Text>Loading...</Text> :
            error ?
              <Text>{`${error.name} ${error.message}\nCause: ${error.cause}`}</Text> :
              <>
                <FlatList
                  style={{ flex: 1 }}
                  data={data}
                  keyExtractor={(item) => item.routine.id.toString()}
                  renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => { addRoutine(item.routine.id) }}>
                      <RoutineCard
                        id={item.routine.id}
                        name={item.routine.name}
                        muscles={item.targets}
                      />
                    </TouchableOpacity>
                  }
                />
                {errMsg.length > 0 && <Text>{errMsg}</Text>}
              </>
        }
      </View>
    </ModalBase>
  )
}

export default AddRoutineModal

const styles = StyleSheet.create({
  modalView: {
    maxHeight: "70%"
  }
})
