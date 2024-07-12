import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { exercise } from '@/types/exercises'

const ExerciseCardBase = ({ e }: { e: exercise }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: e.photos[0] }}
        style={{ height: 120, width: 120 }}
      />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 26 }}>{e.name}</Text>
        <Text>{e.bodyPart}</Text>
        <View style={{flex: 1}} />
        <Text>{e.equipment}</Text>
      </View>
    </View>
  )
}

export default ExerciseCardBase

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    margin: 10,
    borderRadius: 5,
    height: 150,
    flexDirection: "row"
  }
})
