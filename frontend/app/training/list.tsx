import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import RoutineList from '@/components/routineList'

const List = () => {
  return (
    <View>
      <Text>List</Text>
      {/* Plan selector dropdown */}
      <Picker>
        <Picker.Item value={0} label='View all routines' />
      </Picker>

      {/* List of routines*/}
      <RoutineList planId={0} />

      <Link href={"/training/createNewRoutine"} asChild>
        <Text>Create new routine</Text>
      </Link>
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
