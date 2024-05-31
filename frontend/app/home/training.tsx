import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import ExerciseList from "@/components/exerciseList";
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Page = () => {
  return (
    <View>
      <View style={styles.dashboard}>
        <Text style={{fontSize: 28, fontWeight: "bold"}}>Dashboard</Text>
        <MaterialCommunityIcons name="image" size={60} />
      </View>


      <View style={{ flexDirection: "row" }} >
        <View style={styles.contentElement}>
          <Text style={{ fontSize: 30 }}>25</Text>
          <Text>workouts completed</Text>
        </View>

        <View style={styles.contentElement}>
          <View style={styles.contentElementTitle}>
            <Text style={{ fontSize: 30 }}>103k</Text>
            <Text>kg</Text>
          </View>
          <View>
            <Text style={{ height: "auto" }}>tonnage{"\n"}lifted</Text>
          </View>
        </View>

        <View style={styles.contentElement}>
          <View style={styles.contentElementTitle}>
            <Text style={{ fontSize: 30 }}>70</Text>
            <Text>kg</Text>
          </View>
          <View>
            <Text>current{"\n"}weight</Text>
          </View>
        </View>
      </View>


      <View style={styles.previousRoutine}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center", backgroundColor: "purple" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>22</Text>
            <Text style={{ color: "white" }}>May</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "thin", color: "#808080", marginBottom: 5 }}>Previous Routine</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Name of routine</Text>
            <Text>7/7 Exercise completed</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="arrow-right" size={20} />
        </TouchableOpacity>
      </View>


      <View style={{ height: "100%", padding: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#808080" }}>My workouts</Text>
          <Link href={"/training/createNewExercise"} asChild>
            <Text style={{ color: "#4040FF" }}>Show all</Text>
          </Link>
        </View>
        <ExerciseList />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  contentElement: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#808080",
    margin: 0,
    padding: 10
  },
  contentElementTitle: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end"
  },
  dashboard: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  previousRoutine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    margin: 0,
    borderBottomColor: "#808080",
    borderStyle: "solid",
    borderBottomWidth: 0.5,
  }
});
