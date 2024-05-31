import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const List = () => {
  return (
    <View>
      <Text>List</Text>
      {/* Plan selector dropdown */}

      {/* List of routines*/}

      <Link href={"/training/createNewRoutine"} asChild>
        <Text>Create new routine</Text>
      </Link>
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
