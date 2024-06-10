import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { musclesEnum } from '@/schema/exerciseModel'
import { Link } from 'expo-router'

const RoutineCard = ({ name, id, muscles }: { name: string, id: number, muscles: (typeof musclesEnum[number])[] }) => {
  return (
    <Link href={`/training/routine/${id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Text>{name}</Text>
        <Text>Targeted muscles: {muscles.join(",")}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default RoutineCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C0C0C0",
    height: 60,
    margin: 10,
    borderRadius: 5,
    padding: 5
  }
})
