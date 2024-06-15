import { Button, Text, View } from 'react-native'
import React, { useState } from 'react'
import RoutineList from '@/components/routineList'
import PlansDropdown from '@/components/plansDropdown'

const List = () => {
  const [planId, setPlanId] = useState<number>()

  return (
    <View style={{ flex: 1 }}>

      <Text>List</Text>

      {/* Plan selector dropdown */}
      <PlansDropdown planId={planId} setPlanId={setPlanId} />

      {/* List of routines*/}
      <RoutineList planId={planId} />

    </View>
  )
}

export default List

