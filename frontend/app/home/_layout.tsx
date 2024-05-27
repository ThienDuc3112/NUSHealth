import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }} initialRouteName="training">
        <Tabs.Screen name="training" options={{ title: "Training" }} />
        <Tabs.Screen name="hub" options={{ title: "Hub" }} />
        <Tabs.Screen name="forum" options={{ title: "Forum" }} />
        <Tabs.Screen name="account" options={{ title: "Account" }} />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
