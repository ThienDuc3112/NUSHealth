import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import ExerciseList from "@/components/exerciseList";

const Page = () => {
  return (
    <ScrollView>
      <Text>Page</Text>
      <Link asChild href="/account/login">
        <Text>Login</Text>
      </Link>
      <Link asChild href="/training/createNewExercise">
        <Text>Create new exercise</Text>
      </Link>
      <View>
        <ExerciseList />
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
