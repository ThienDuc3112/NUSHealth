import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'

const SetCard = ({ order, reps, kg, finished, active, touched }: {
  order: number,
  reps: number,
  kg?: number,
  finished: boolean,
  active: boolean,
  touched: boolean
}) => {
  return (
    <View style={[styles.container, active ? { backgroundColor: "white" } : {}]}>
      <Text>{order}</Text>
      <Text>{reps} Reps</Text>
      <Text>{kg ?? "+"} Kg</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {touched ? finished ? <Ionicons name='checkmark' /> : <Entypo name='cross' /> : null}
      </View>
    </View>
  )
}

export default SetCard

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10, backgroundColor: "#808080" }
})
