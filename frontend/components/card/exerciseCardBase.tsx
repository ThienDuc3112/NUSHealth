import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { exercise } from '@/types/exercises'

const ExerciseCardBase = ({ e }: { e: exercise & { reps?: number, sets?: number, kg?: number | null } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.exercise}>
        <Image
          source={{ uri: e.photos[0] }}
          style={{ height: 120, width: 120 }}
        />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>{e.name}</Text>
          <Text>{e.bodyPart}</Text>
          <View style={{ flex: 1 }} />
          <Text>{e.equipment}</Text>
        </View>
      </View>

      {
        e.reps && e.sets &&
        <View style={styles.routineInfo}>
          <Text>{e.sets} sep     {e.reps} rep</Text>
        </View>
      }
    </View>
  )
}

export default ExerciseCardBase

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
  },
  exercise: {
    height: 150,
    flexDirection: "row",
    padding: 5,
  },
  routineInfo: {
    backgroundColor: "#c0c0c0"
  }
})
