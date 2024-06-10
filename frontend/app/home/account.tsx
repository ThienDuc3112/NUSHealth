import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import { deleteItemAsync, getItem } from "expo-secure-store"

const Account = () => {
  const [token, setToken] = useState("")
  const fetchToken = useCallback(() => {
    const token = getItem("token")
    if (token != null) setToken(token)
  }, [])
  useFocusEffect(fetchToken)
  return (
    <View>
      <Text>Account</Text>
      <View>
        <Text>Token: {token.length == 0? "Nothing" : token} </Text>
      </View>
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
        <Link href={"/account/localWorkouts"} asChild>
          <TouchableOpacity style={{ backgroundColor: "cyan", borderRadius: 5, alignSelf: "center", alignItems: "center", justifyContent: "center", margin: 10, paddingHorizontal: 20 }}>
            <Text style={{ marginVertical: 10 }}>Local Workouts</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={{
            backgroundColor: "cyan",
            borderRadius: 5,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
            paddingHorizontal: 20
          }}
          onPress={async () => {
            await deleteItemAsync("token")
            setToken("")
          }}
        >
          <Text style={{ marginVertical: 10 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
