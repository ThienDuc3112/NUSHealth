import {
  Button,
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
  targetedMuscleTable,
} from "@/schema/exerciseModel";
import { FieldArray, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInputWithSuggestion from "@/components/textInputWithSuggestion";
import Body from "react-native-body-highlighter"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(255),
  target: Yup.string().required(),
  equipment: Yup.string().oneOf(equipmentsEnum).required(),
  instruction: Yup.string(),
  targetedMuscles: Yup.array().of(Yup.string().oneOf(musclesEnum)),
  generic: Yup.string()
});

const CreateNewExercise = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Create new exercise",
    });
  }, []);

  const submitHandler = async (data: any, { resetForm, setFieldError }: FormikHelpers<any>) => {
    try {
      await db
        .transaction(async (tx) => {
          const [res] = await tx
            .insert(exerciseTable)
            .values({ ...data, targetedMuscles: undefined } as any)
            .returning();
          console.log("insert exercse:");
          console.log(JSON.stringify(res, null, 2));
          const targetedMuscles: any[] =
            data.secondaryMuscles
              .filter((value: any, index: number, self: any[]) =>
                value != "" && index === self.indexOf(value))
          if (targetedMuscles.length > 0) {
            const secondMusRes = await tx
              .insert(targetedMuscleTable)
              .values(
                targetedMuscles.map((muscle) => ({ exercisesId: res.id, muscle: muscle }))
              )
              .returning();
            console.log("insert second muscle:");
            console.log(JSON.stringify(secondMusRes, null, 2));
          }
          resetForm()
        })
    } catch (error) {
      console.error(error)
      setFieldError("generic", `Generic error happened!\nThis shouldn't happened, contact the developer for help, or try change some field values\n${(error as any)?.message}\n${JSON.stringify(error, null, 2)}`)
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          target: "",
          equipment: "",
          instruction: "",
          secondaryMuscles: [],
          generic: ""
        }}
        onSubmit={submitHandler}
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
            {touched.name && errors.name && <Text
              style={styles.errorText}
            >{errors.name}</Text>}

            <Text>Target part: </Text>
            <TextInputWithSuggestion
              value={values.target}
              onChangeText={handleChange("target")}
              suggestions={[...bodyPartsEnum]}
              onBlur={handleBlur("target")}
            />
            {touched.target && errors.target && <Text
              style={styles.errorText}
            >{errors.target}</Text>}


            <Text>Equipment: </Text>
            <TextInputWithSuggestion
              value={values.equipment}
              onChangeText={handleChange("equipment")}
              suggestions={[...equipmentsEnum]}
              onBlur={handleBlur("equipment")}
            />
            {touched.equipment && errors.equipment && (
              <Text
                style={styles.errorText}
              >{errors.equipment}</Text>
            )}

            <Text>Instruction: </Text>
            <TextInput
              style={styles.input}
              onBlur={handleBlur("instruction")}
              onChangeText={handleChange("instruction")}
              value={values.instruction}
            />
            {touched.instruction && errors.instruction && (
              <Text
                style={styles.errorText}
              >{errors.instruction}</Text>
            )}

            <FieldArray name="secondaryMuscles">
              {({ push, remove }) => (
                <View>
                  <Text>Secondary target muscles</Text>
                  {values.secondaryMuscles.map((muscle, index) => (
                    <View key={index}>

                      <TextInputWithSuggestion
                        onBlur={handleBlur(`secondaryMuscles[${index}]`)}
                        onChangeText={(text) => {
                          setFieldValue(`secondaryMuscles[${index}]`, text)
                        }}
                        value={muscle}
                        suggestions={[...musclesEnum]}
                      />

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

            {errors.generic && <Text>{errors.generic}</Text>}

            <Body 
              gender="male"
              side="front"
              data={[
                {slug: "adductors", intensity: 1, color: "blue"}
              ]}
              onBodyPartPress={b => console.log(b)}
              frontOnly
              backOnly={false}
            />

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
  errorText: {
    color: "red"
  }
});
