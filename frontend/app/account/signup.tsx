import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { registerType } from "@/types/signup";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { API } from "@/constants/api";
import { router } from "expo-router";

const registerSchema = Yup.object().shape({
  username: Yup.string().max(50).min(3).required(),
  displayname: Yup.string().max(50).min(3).notRequired(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(40).required(),
  passwordVerify: Yup.string().min(8).max(40).required(),
});

const Signup = () => {
  const [generalError, setGeneralError] = useState(null as string | null)

  const onSubmit = async (
    value: registerType,
    { setErrors }: FormikHelpers<registerType>
  ) => {
    console.log(JSON.stringify(value));
    try {
      const res = await fetch(API + "/auth/register", {
        method: "POST", body: JSON.stringify(value), headers: {
          "Content-type": "application/json"
        }
      })
      if (res.ok) {
        router.navigate("/account/login")
      } else {
        if (typeof res.json == "function") {
          const data = await res.json()
          console.log(data)
          if (res.status == 400)
            setErrors(data);
          else
            setGeneralError(data.message)
        } else
          setGeneralError("Generic error occured")
      }
    } catch (error) {
      console.error(error)
      setGeneralError("Generic error occured")
    }
  };

  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={{
        username: "",
        displayname: "",
        email: "",
        password: "",
        passwordVerify: "",
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        handleBlur,
        handleSubmit,
        touched,
        isSubmitting,
      }) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
          />
          {touched.username && touched.username && (
            <Text>{errors.username}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Display name (optional)"
            onChangeText={handleChange("displayname")}
            onBlur={handleBlur("displayname")}
            value={values.displayname}
          />
          {touched.displayname && touched.displayname && (
            <Text>{errors.displayname}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && touched.email && <Text>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            textContentType="password"
          />
          {touched.password && touched.password && (
            <Text>{errors.password}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Retype password"
            onChangeText={handleChange("passwordVerify")}
            onBlur={handleBlur("passwordVerify")}
            value={values.passwordVerify}
            textContentType="password"
          />
          {touched.passwordVerify && touched.passwordVerify && (
            <Text>{errors.passwordVerify}</Text>
          )}

          {generalError && <Text>{generalError}</Text>}

          <Button
            title="register"
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

export default Signup;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: "80%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});
