import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const NotFound = () => {
  return (
    <View>
      <Text>NotFound</Text>
      <Link asChild href={"/(home)/training"}>
        <Text>Go to home</Text>
      </Link>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({});
