import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }} initialRouteName="training">
        <Tabs.Screen name="training" options={{ title: "Training", tabBarIcon: ({color}) => <Ionicons name="barbell" size={20} color={color} /> }} />
        <Tabs.Screen name="hub" options={{ title: "Hub", tabBarIcon: ({color}) => <Ionicons size={20} name="clipboard" color={color} /> }} />
        <Tabs.Screen name="forum" options={{ title: "Forum", tabBarIcon: ({color}) => <Ionicons size={20} name="chatbubble" color={color} /> }} />
        <Tabs.Screen name="account" options={{ title: "Account", tabBarIcon: ({color}) => <Ionicons size={20} name="person" color={color} /> }} />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
