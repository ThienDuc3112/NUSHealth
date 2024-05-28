import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { db } from "@/db/client";
import {
  bodyPartsEnum,
  equipmentsEnum,
  exercisePhotoTable,
  exerciseTable,
  musclesEnum,
  secondaryMuscleTable,
} from "@/schema/exerciseModel";
import { eq } from "drizzle-orm";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(255),
  bodyPart: Yup.string().oneOf(bodyPartsEnum).required(),
  target: Yup.string().oneOf(musclesEnum).required(),
  equipment: Yup.string()
    .oneOf(equipmentsEnum)
    .required()
    .default("body weight"),
  instruction: Yup.string(),
});

const CreateNewExercise = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Create new exercise",
    });
    db.select()
      .from(exerciseTable)
      .leftJoin(
        exercisePhotoTable,
        eq(exerciseTable.id, exercisePhotoTable.exercisesId)
      )
      .leftJoin(
        secondaryMuscleTable,
        eq(exerciseTable.id, secondaryMuscleTable.exercisesId)
      )
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
  }, []);
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          bodyPart: "",
          target: "",
          equipment: "body weight",
          instruction: "",
        }}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {({
          errors,
          values,
          handleChange,
          handleSubmit,
          touched,
          handleBlur,
          setFieldValue,
        }) => (
          <>
            <Text>Name: </Text>
            <TextInput
              style={styles.input}
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              value={values.name}
            />
            {touched.name && errors.name && <Text>{errors.name}</Text>}
            <Text>Body part: </Text>
            <Picker
              onBlur={handleBlur("bodyPart")}
              onValueChange={(value) => setFieldValue("bodyPart", value)}
              selectedValue={values.bodyPart}
            >
              <Picker.Item
                label={"Select an option"}
                value={""}
                enabled={false}
              />
              {bodyPartsEnum.map((part) => (
                <Picker.Item label={part} value={part} key={part} />
              ))}
            </Picker>
            {touched.bodyPart && errors.bodyPart && (
              <Text>{errors.bodyPart}</Text>
            )}
            <Text>Target muscle: </Text>
            <Picker
              onBlur={handleBlur("target")}
              onValueChange={(value) => setFieldValue("target", value)}
              selectedValue={values.target}
            >
              <Picker.Item
                label={"Select an option"}
                value={""}
                enabled={false}
              />
              {musclesEnum.map((part) => (
                <Picker.Item label={part} value={part} key={part} />
              ))}
            </Picker>
            {touched.target && errors.target && <Text>{errors.target}</Text>}
            <Text>Equipment: </Text>
            <Picker
              onBlur={handleBlur("equipment")}
              onValueChange={(value) => setFieldValue("equipment", value)}
              selectedValue={values.equipment}
            >
              <Picker.Item
                label={"Select an option"}
                value={""}
                enabled={false}
              />
              {equipmentsEnum.map((part) => (
                <Picker.Item label={part} value={part} key={part} />
              ))}
            </Picker>
            {touched.equipment && errors.equipment && (
              <Text>{errors.equipment}</Text>
            )}
            <Text>Instruction: </Text>
            <TextInput
              style={styles.input}
              onBlur={handleBlur("instruction")}
              onChangeText={handleChange("instruction")}
              value={values.instruction}
            />
            {touched.instruction && errors.instruction && (
              <Text>{errors.instruction}</Text>
            )}
            <Button onPress={() => handleSubmit()} title="Submit" />
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateNewExercise;

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
