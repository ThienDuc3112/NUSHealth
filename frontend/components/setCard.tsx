import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'

const SetCard = ({ order, reps, kg, finished }: { order: number, reps: number, kg?: number, finished: boolean }) => {
  return (
    <View style={styles.container}>
      <Text>{order}</Text>
      <Text>{reps} Reps</Text>
      <Text>{kg ?? "+"} Kg</Text>
      <View style={{justifyContent: "center", alignItems: "center"}}>
        {finished ? <Ionicons name='checkmark' /> : <Entypo name='cross' />}
      </View>
    </View>
  )
}

export default SetCard

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10, backgroundColor: "#808080" }
})
