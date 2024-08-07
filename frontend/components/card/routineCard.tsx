import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RoutineCard = ({ name, id, muscles }: { name: string, id: number, muscles: string[] }) => {
  id;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>Targeted muscles: {muscles.join(", ")}</Text>
    </View>
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
