import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const HomeRoutineList = () => {
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
          To be implement here
        </Text>
      </View>
    </View>
  );
};

export default HomeRoutineList;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
