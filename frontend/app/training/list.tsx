import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import RoutineList from '@/components/routineList'
import { db } from '@/db/client'
import { routineTable } from '@/schema/routineModel'
import * as Yup from "yup"
import { CustomModal } from '@/components/modal'

const List = () => {
  const [openModal, setOpenModal] = useState(false)
  const [newRoutineName, setNewRoutineName] = useState("")
  const [error, setError] = useState("")

  const createNewRoutine = async (name: string) => {
    const valid = Yup.string().max(30).min(1).isValidSync(name)
    if (!valid) return setError("The name is required and less than 30 characters")
    try {
      const res = (await db.insert(routineTable).values({ name: name }).returning())[0]
      setOpenModal(false)
      setNewRoutineName("")
      router.navigate(`/training/routine/${res.id}`)
    } catch (err) {
      console.error(err)
      setError("Cannot create " + name)
      return;
    }
  }

  return (
    <View>
      <CustomModal open={openModal} onClose={() => {
        setNewRoutineName("")
        setError("")
        setOpenModal(false)
      }}>
        <View style={styles.modalView}>
          <Text>New routine name</Text>

          <TextInput style={{
            width: 200,
            height: 30,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "black"
          }}
            onChangeText={text => {
              setError("")
              setNewRoutineName(text.slice(0, 30))
            }}
            value={newRoutineName}
          />
          {error.length != 0 && <Text>{error}</Text>}

          <Button title='Create' onPress={() => createNewRoutine(newRoutineName)} />
        </View>
      </CustomModal>

      <Text>List</Text>

      {/* Plan selector dropdown */}
      <Picker>
        <Picker.Item value={0} label='View all routines' />
      </Picker>

      {/* List of routines*/}
      <RoutineList planId={0} />

      <Button title='Create new routine' onPress={() => setOpenModal(true)} />

    </View>
  )
}

export default List

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
