import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocalExercises } from "@/helpers/getExercises";
import { Link, useFocusEffect } from "expo-router";

const HomeRoutineList = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercises"],
    queryFn: getLocalExercises,
    refetchOnMount: true,
  });
  const memorized = useCallback(() => { refetch() }, [])
  useFocusEffect(memorized);
  return (
    <View style={{ height: "100%", padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#808080" }}>My workouts</Text>
        <Link href={"/training/list"} asChild>
          <Text style={{ color: "#4040FF" }}>Show all</Text>
        </Link>
      </View>
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
    </View>
  );
};

export default HomeRoutineList;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
