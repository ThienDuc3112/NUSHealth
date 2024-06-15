import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { ModalBase } from '@/components/modal/modalBase'
import * as Yup from "yup"
import { db } from '@/db/client'
import { planTable } from '@/schema/planModel'
import { GlobalStyles } from '@/constants/styles'

const AddPlanModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [newPlanName, setNewPlanName] = useState("")
  const [newPlanError, setNewPlanError] = useState("")

  const createNewPlan = async (name: string) => {
    const valid = Yup.string().max(30).min(1).isValidSync(name)
    if (!valid) return setNewPlanError("The name is required and less than 30 characters")
    try {
      await db.insert(planTable).values({ name: name }).returning()
      setNewPlanName("")
      onClose()
    } catch (err) {
      console.error(err)
      setNewPlanError("Cannot create " + name)
      return;
    }
  }

  return (
    <ModalBase open={open} onClose={onClose}>
      <View style={GlobalStyles.modalView}>
        <Text>New plan name</Text>

        <TextInput style={{
          width: 200,
          height: 30,
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "black"
        }}
          onChangeText={text => {
            setNewPlanError("")
            setNewPlanName(text.slice(0, 30))
          }}
          value={newPlanName}
        />
        {newPlanError.length != 0 && <Text>{newPlanError}</Text>}

        <Button title='Create' onPress={() => createNewPlan(newPlanName)} />
      </View>
    </ModalBase>
  )
}

export default AddPlanModal

const styles = StyleSheet.create({})
