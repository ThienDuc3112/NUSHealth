import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Account = () => {
  return (
    <View>
      <Text>Account</Text>
      <View>
        <Link href={"/account/login"} asChild>
          <TouchableOpacity style={{ backgroundColor: "cyan", borderRadius: 5, alignSelf: "center", alignItems: "center", justifyContent: "center", margin: 10, paddingHorizontal: 20 }}>
            <Text style={{ marginVertical: 10 }}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/account/signup"} asChild>
          <TouchableOpacity style={{ backgroundColor: "cyan", borderRadius: 5, alignSelf: "center", alignItems: "center", justifyContent: "center", margin: 10, paddingHorizontal: 20 }}>
            <Text style={{ marginVertical: 10 }}>Signup</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
