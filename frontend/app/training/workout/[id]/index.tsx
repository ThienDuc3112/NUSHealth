import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRoutineById } from '@/helpers/getRoutineById'
import SetCard from '@/components/card/setCard'

const Workout = () => {
  const { id } = useLocalSearchParams()
  const [ex, setEx] = useState(0)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["routine", id],
    queryFn: async () => getRoutineById(Number(id)),
    enabled: !!id
  })

  useFocusEffect(useCallback(() => { refetch() }, []))

  if (isLoading) return <View><Text>Loading...</Text></View>
  if (error) return <View><Text>{error.message}</Text></View>

  return (
    <View style={{ flex: 1 }}>
      <Text>Workout</Text>
      <View>
        <Text>
          {data?.exercises[ex].name}
        </Text>

        {
          data?.exercises[ex].instruction &&
          <Text>
            {
              data?.exercises[ex].instruction
            }
          </Text>
        }
      </View>

      <ScrollView style={{ flex: 1 }}>
        {
          Array(data?.exercises[ex].sets).fill(0, 0, data?.exercises[ex].sets).map((_, idx) =>
          (<SetCard
            touched={true}
            active={true}
            key={idx}
            order={idx + 1}
            reps={data!.exercises[ex].reps}
            kg={data?.exercises[ex].kg ?? undefined}
            finished={false}
          />))
        }
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", width: "100%" }}>
        <Button title='Skip set' />
        <View style={styles.bottomData}>
          <Text>{data?.exercises[ex].reps} Reps</Text>
          <Text>{data?.exercises[ex].kg ?? "+"} Kg</Text>
        </View>
        <Button title='Finish set' />
      </View>
    </View>
  )
}

export default Workout

const styles = StyleSheet.create({
  bottomData: { flex: 1, gap: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }
})
