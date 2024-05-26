import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const AccountPage = () => {
  return (
    <View>
      <Link href="/(account)/login" asChild>
        <Text>Login</Text>
      </Link>
      <Link href="/(account)/signup" asChild>
        <Text>Signup</Text>
      </Link>
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({});
