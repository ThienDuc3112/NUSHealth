import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup"
import { API } from "@/constants/api";
import { setItemAsync } from "expo-secure-store"
import { router } from "expo-router";

type loginType = {
  username: string
  password: string
}

const loginSchema = Yup.object().shape({
  username: Yup.string().max(50).min(3).required(),
  password: Yup.string().min(8).max(40).required(),
})

const Login = () => {
  const [generalError, setGeneralError] = useState(null as string | null)

  const onSubmit = async (
    value: loginType,
    { setErrors }: FormikHelpers<loginType>
  ) => {
    console.log(value)
    try {
      const res = await fetch(API + "/auth/login", {
        headers: {
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(value)
      })

      const data = await res.json()
      
      console.log(data)

      if(res.ok){
        await setItemAsync("token", data.token)
        router.navigate("/home/training")
      } else {
        if(res.status < 500) {
          setErrors(data)
        } else {
          setGeneralError(data.message)
        }
      }

    } catch (error) {
      console.error(error)
      setGeneralError("Generic error occured")
    }
  }

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{
        username: "",
        password: "",
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
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            textContentType="password"
          />
          {touched.password && touched.password && (
            <Text>{errors.password}</Text>
          )}

          {generalError && <Text>{generalError}</Text>}

          <Button
            title="Sign in"
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: "80%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});
