import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View>
      <Text>Page</Text>
      <Link asChild href="/account/login">
        <Text>Login</Text>
      </Link>
      <Link asChild href="/training/createNewExercise">
        <Text>Create new exercise</Text>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
