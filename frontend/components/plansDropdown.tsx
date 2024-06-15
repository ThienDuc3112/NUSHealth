import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from 'expo-router'
import { getLocalPlans } from '@/helpers/getLocalPlans'
import { useQuery } from '@tanstack/react-query'
import AddPlanModal from './modal/addPlanModal'
import { GlobalStyles } from '@/constants/styles'

const PlansDropdown = ({ planId, setPlanId }: { planId?: number, setPlanId: Dispatch<SetStateAction<number | undefined>> }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["plans"],
    queryFn: getLocalPlans
  })
  const [open, setOpen] = useState(false)

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <View style={styles.container}>
      <TouchableOpacity style={GlobalStyles.roundBtn} onPress={() => setOpen(true)}>
        <Ionicons name='add' size={28} />
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
  container: { marginHorizontal: 15, flexDirection: 'row', alignItems: "center", justifyContent: "center" },
})
