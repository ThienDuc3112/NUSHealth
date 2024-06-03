import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

const RoutineInfo = () => {
  const {id} = useLocalSearchParams()
  useEffect(() => console.log(id), [id])

  return (
    <View>
      <Text>RoutineInfo</Text>
      <Text>Routine id: {id}</Text>
    </View>
  )
}

export default RoutineInfo

const styles = StyleSheet.create({})
