import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { ModalBase } from './modalBase'
import { router } from 'expo-router'
import { routineTable } from '@/schema/routineModel'
import { db } from '@/db/client'
import * as Yup from "yup"
import { routineToPlanTable } from '@/schema/routineToPlanModel'

const AddRoutineModal = ({ open, onClose, planId }: { open: boolean, onClose: () => void, planId?: number }) => {
  const [newRoutineName, setNewRoutineName] = useState("")
  const [nameError, setNameError] = useState("")

  const createNewRoutine = async (name: string) => {
    const valid = Yup.string().max(30).min(1).isValidSync(name)
    if (!valid) return setNameError("The name is required and less than 30 characters")
    try {
      const res = (await db.insert(routineTable).values({ name: name }).returning())[0]
      setNewRoutineName("")
      if (planId) {
        try {
          await db.insert(routineToPlanTable).values({ planId: planId, routineId: res.id })
          onClose()
          router.navigate(`/training/routine/${res.id}`)
        } catch (error) {
          setNameError("Successfully added routine, but failed to add routine to plan")
        }
      } else {
        onClose()
        router.navigate(`/training/routine/${res.id}`)
      }
    } catch (err) {
      console.error(err)
      setNameError("Cannot create " + name)
      return;
    }
  }

  return <ModalBase open={open} onClose={() => {
    setNewRoutineName("")
    setNameError("")
    onClose()
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
          setNameError("")
          setNewRoutineName(text.slice(0, 30))
        }}
        value={newRoutineName}
      />
      {nameError.length != 0 && <Text>{nameError}</Text>}

      <Button title='Create' onPress={() => createNewRoutine(newRoutineName)} />
    </View>
  </ModalBase>
}

export default AddRoutineModal

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
})
