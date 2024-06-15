import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from 'expo-router'
import { getLocalPlans } from '@/helpers/getLocalPlans'
import { useQuery } from '@tanstack/react-query'
import AddPlanModal from './modal/addPlanModal'

const PlansDropdown = ({ planId, setPlanId }: { planId?: number, setPlanId: Dispatch<SetStateAction<number | undefined>> }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["plans"],
    queryFn: getLocalPlans
  })
  const [open, setOpen] = useState(false)

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.roundBtn} onPress={() => setOpen(true)}>
        <Ionicons name='add' size={32} />
      </TouchableOpacity>

      <Picker style={{ flex: 1 }} selectedValue={planId} onValueChange={(value) => { setPlanId(value) }}>
        <Picker.Item value={undefined} label='View all routines' />
        {
          isLoading ?
            <Picker.Item enabled={false} label='Loading' /> :
            error ?
              <Picker.Item enabled={false} label='Cannot get plans' /> :
              data?.map(plan => <Picker.Item key={plan.id} value={plan.id} label={plan.name} />)
        }
      </Picker>

      <AddPlanModal open={open} onClose={() => {
        setOpen(false)
        refetch()
      }} />
    </View>
  )
}

export default PlansDropdown

const styles = StyleSheet.create({
  roundBtn: { height: "auto", width: "auto", padding: 8, flex: 0, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: Number.MAX_SAFE_INTEGER },
  container: { marginHorizontal: 15, flexDirection: 'row', alignItems: "center", justifyContent: "center" },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
