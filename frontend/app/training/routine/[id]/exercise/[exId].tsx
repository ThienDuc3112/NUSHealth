import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getExerciseById } from '@/helpers/getExercises'
import ExerciseView from '@/components/exerciseView'
import * as Yup from "yup"
import { Formik } from 'formik'
import { addExerciseToRoutine } from '@/helpers/addExerciseToRoutine'

const routineExerciseSchema = Yup.object().shape({
  sets: Yup.number().required(),
  reps: Yup.number().required(),
  kg: Yup.number().notRequired()
})

const SetRep = () => {
  const { id, exId } = useLocalSearchParams()
  const queryFn = useCallback(() => getExerciseById(Number(exId)), [exId])
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercise", exId],
    queryFn,
    enabled: !!exId
  })

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <ScrollView>
      <Text>SetRep</Text>
      <Text>Exercise ID: {exId}</Text>
      <Text>Routine ID: {id}</Text>
      {isLoading ?
        <Text>Loading...</Text> :
        data ?
          <ExerciseView e={data} /> :
          <Text>{error!.message}</Text>
      }

      <Formik
        initialValues={{
          sets: "",
          reps: "",
          kg: undefined
        }}
        validationSchema={routineExerciseSchema}
        onSubmit={async (data) => {
          console.log(data)
          const succeed = await addExerciseToRoutine(
            Number(exId),
            Number(id),
            Number(data.sets),
            Number(data.reps),
            Number(data.kg)
          )
          setSuccess(succeed)
          if (succeed) {
            router.navigate(`/training/routine/${id}`)
          }
        }}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>
        (<>
          <Text>Sets</Text>
          <TextInput
            placeholder='Sets'
            value={values.sets}
            onChangeText={handleChange("sets")}
            onBlur={handleBlur("sets")}
            style={styles.input}
            keyboardType='numeric'
          />
          {touched.sets && errors.sets && <Text>{errors.sets}</Text>}
          <Text>Reps</Text>
          <TextInput
            placeholder='Reps'
            value={values.reps}
            onChangeText={handleChange("reps")}
            onBlur={handleBlur("reps")}
            style={styles.input}
            keyboardType='numeric'
          />
          {touched.reps && errors.reps && <Text>{errors.reps}</Text>}
          <Text>Weight</Text>
          <TextInput
            placeholder='kg'
            value={values.kg}
            onChangeText={handleChange("kg")}
            onBlur={handleBlur("kg")}
            style={styles.input}
            keyboardType='numeric'
          />
          {touched.kg && errors.kg && <Text>{errors.kg}</Text>}
          {success === undefined ? null : success ? <Text>Added</Text> : <Text>Failed to add</Text>}
          <Button title='Submit' onPress={() => handleSubmit()} />
        </>)}
      </Formik>
    </ScrollView>
  )
}

export default SetRep

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
})
