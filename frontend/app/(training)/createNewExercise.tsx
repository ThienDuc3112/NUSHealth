import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

const CreateNewExercise = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Create new exercise",
    });
  }, []);
  return (
    <View>
      <Text>Create new exercise</Text>
      <TextInput />
    </View>
  );
};

export default CreateNewExercise;

const styles = StyleSheet.create({});
