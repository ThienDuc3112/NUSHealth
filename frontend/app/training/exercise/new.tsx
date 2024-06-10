import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { db } from "@/db/client";
import {
  bodyPartsEnum,
  equipmentsEnum,
  exerciseTable,
  musclesEnum,
  secondaryMuscleTable,
} from "@/schema/exerciseModel";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(255),
  bodyPart: Yup.string().oneOf(bodyPartsEnum).required(),
  target: Yup.string().oneOf(musclesEnum).required(),
  equipment: Yup.string().oneOf(equipmentsEnum).required(),
  instruction: Yup.string(),
  secondaryMuscles: Yup.array().of(Yup.string().oneOf(musclesEnum)),
});

const CreateNewExercise = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Create new exercise",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          bodyPart: "",
          target: "",
          equipment: "",
          instruction: "",
          secondaryMuscles: [],
        }}
        onSubmit={async (data, { resetForm }) => {
          await db
            .transaction(async (tx) => {
              const [res] = await tx
                .insert(exerciseTable)
                .values({ ...data, secondaryMuscles: undefined } as any)
                .returning();
              console.log("insert exercse:");
              console.log(JSON.stringify(res, null, 2));
              const secondMusRes = await tx
                .insert(secondaryMuscleTable)
                .values(
                  data.secondaryMuscles
                    .filter((value) => value != "")
                    .map((muscle) => ({ exercisesId: res.id, muscle: muscle }))
                )
                .returning();
              console.log("insert second muscle:");
              console.log(JSON.stringify(secondMusRes, null, 2));
            })
            .then(() => resetForm())
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
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
              <Picker.Item label={"Select an option"} value={""} />
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
              <Picker.Item label={"Select an option"} value={""} />
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
              <Picker.Item label={"Select an option"} value={""} />
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
            <FieldArray name="secondaryMuscles">
              {({ push, remove }) => (
                <View>
                  <Text>Secondary target muscles</Text>
                  {values.secondaryMuscles.map((muscle, index) => (
                    <View key={index}>
                      <Picker
                        onValueChange={(value) =>
                          setFieldValue(`secondaryMuscles[${index}]`, value)
                        }
                        selectedValue={muscle}
                        onBlur={handleBlur(`secondaryMuscles[${index}]`)}
                      >
                        <Picker.Item label={"Select an option"} value={""} />
                        {musclesEnum.map((part) => (
                          <Picker.Item label={part} value={part} key={part} />
                        ))}
                      </Picker>
                      <Button
                        onPress={() => remove(index)}
                        title="Delete"
                        color={"#bb2222"}
                      />
                    </View>
                  ))}
                  <Button onPress={() => push("")} title="Add target muscle" />
                </View>
              )}
            </FieldArray>
            <Button onPress={() => handleSubmit()} title="Submit" />
          </>
        )}
      </Formik>
    </ScrollView>
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
