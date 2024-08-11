import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { getExerciseById } from "@/helpers/getExercises";
import { useQuery } from "@tanstack/react-query";

const size = Dimensions.get("window").width - 50;

const ExerciseInfo = () => {
  const { id: exId } = useLocalSearchParams();
  const queryFn = useCallback(() => getExerciseById(Number(exId)), [exId]);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exercise", exId],
    queryFn,
    enabled: !!exId,
  });
  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (!data)
    return (
      <View>
        <Text>{error ? error.message : "No data"}</Text>
      </View>
    );

  return (
    <ScrollView>
      <Image
        source={{ uri: data.photos[0] }}
        style={{ width: size, height: size, margin: 25 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 32 }}>{data.name}</Text>
      <Text>Equipemnt: {data.equipment}</Text>
      <Text>
        Instruction: {"\n"}
        {data.instruction}
      </Text>
    </ScrollView>
  );
};

export default ExerciseInfo;

const styles = StyleSheet.create({});
