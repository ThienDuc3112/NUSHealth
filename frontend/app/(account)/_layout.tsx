import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ title: "Account" }} name="index" />
      <Stack.Screen options={{ title: "Login" }} name="login" />
      <Stack.Screen options={{ title: "Sign up" }} name="signup" />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
