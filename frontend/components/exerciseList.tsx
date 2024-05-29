import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocalExercises } from "@/helpers/getExercises";
import { useFocusEffect } from "expo-router";

const ExerciseList = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercies"],
    queryFn: getLocalExercises,
    refetchOnMount: true,
  });
  useFocusEffect(() => {
    refetch();
  });
  return (
    <View style={styles.container}>
      <Text>Exercise list</Text>
      <Text>
        {isLoading
          ? "Loading..."
          : data
          ? JSON.stringify(data, null, 2)
          : JSON.stringify(error, null, 2)}
      </Text>
    </View>
  );
};

export default ExerciseList;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
