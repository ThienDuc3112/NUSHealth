import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { db } from "@/db/client";
import { exerciseTable, targetedMuscleTable } from "@/schema/exerciseModel";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Body, { BodyPart } from "react-native-body-highlighter";
import { globalStyle } from "@/style/theme";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(255),
  target: Yup.string().required(),
  equipment: Yup.string().required(),
  instruction: Yup.string(),
  generic: Yup.string(),
});

const CreateNewExercise = () => {
  const [highlight, setHightlight] = useState<BodyPart[]>([]);

  const submitHandler = async (
    data: any,
    { resetForm, setFieldError }: FormikHelpers<any>
  ) => {
    try {
      await db.transaction(async (tx) => {
        const [res] = await tx
          .insert(exerciseTable)
          .values({ ...data, targetedMuscles: undefined } as any)
          .returning();
        console.log("insert exercse:");
        console.log(JSON.stringify(res, null, 2));
        const targetedMuscles: any[] = highlight
          .map((e) => e.slug)
          .filter((val, idx, self) => self.indexOf(val) !== idx);
        if (targetedMuscles.length > 0) {
          const insertedTargetMuscles = await tx
            .insert(targetedMuscleTable)
            .values(
              targetedMuscles.map((muscle) => ({
                exercisesId: res.id,
                muscle: muscle,
              }))
            )
            .returning();
          console.log("insert second muscle:");
          console.log(JSON.stringify(insertedTargetMuscles, null, 2));
        }
        resetForm();
        setHightlight([]);
      });
    } catch (error) {
      console.error(error);
      setFieldError(
        "generic",
        `Generic error happened!\nThis shouldn't happened, contact the developer for help, or try change some field values\n${
          (error as any)?.message
        }\n${JSON.stringify(error, null, 2)}`
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          target: "",
          equipment: "",
          instruction: "",
          secondaryMuscles: [],
          generic: "",
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
        }) => (
          <>
            <Text>Name: </Text>
            <TextInput
              style={globalStyle.input}
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <Text>Target group: </Text>
            <TextInput
              style={globalStyle.input}
              onBlur={handleBlur("target")}
              onChangeText={handleChange("target")}
              value={values.target}
            />
            {touched.target && errors.target && (
              <Text style={styles.errorText}>{errors.target}</Text>
            )}

            <Text>Equipment: </Text>
            <TextInput
              style={globalStyle.input}
              onBlur={handleBlur("equipment")}
              onChangeText={handleChange("equipment")}
              value={values.equipment}
            />
            {touched.equipment && errors.equipment && (
              <Text style={styles.errorText}>{errors.equipment}</Text>
            )}

            <Text>Instruction: </Text>
            <TextInput
              style={globalStyle.input}
              onBlur={handleBlur("instruction")}
              onChangeText={handleChange("instruction")}
              value={values.instruction}
              multiline
            />
            {touched.instruction && errors.instruction && (
              <Text style={styles.errorText}>{errors.instruction}</Text>
            )}

            <Text>Specific muscles targeted (optional): </Text>
            <Text>
              Selected: {highlight.map((v) => v.slug).join(", ") || "None"}{" "}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Body
                gender="male"
                side="front"
                data={highlight}
                onBodyPartPress={(b) => {
                  setHightlight((prev) => {
                    const idx = prev.findIndex((val) => val.slug === b.slug);
                    if (idx != -1) {
                      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
                    } else {
                      return [...prev, { ...b, intensity: 1 }];
                    }
                  });
                }}
                frontOnly
                backOnly={false}
              />

              <Body
                gender="male"
                side="back"
                data={highlight}
                onBodyPartPress={(b) => {
                  setHightlight((prev) => {
                    const idx = prev.findIndex((val) => val.slug === b.slug);
                    if (idx != -1) {
                      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
                    } else {
                      return [...prev, { ...b, intensity: 1 }];
                    }
                  });
                }}
                frontOnly={false}
                backOnly
              />
            </View>

            {errors.generic && <Text>{errors.generic}</Text>}

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
    minHeight: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorText: {
    color: "red",
  },
});
