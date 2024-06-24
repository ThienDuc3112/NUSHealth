import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { db } from "@/db/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getItem, setItem } from "expo-secure-store";
import { loadDefaultExercises } from "@/helpers/loadDefaultExercises";
const queryClient = new QueryClient()

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { success, error: dbError } = useMigrations(db, migrations);
  useEffect(() => {
    if (dbError) console.error(dbError);
    console.log(success);
  }, [success, dbError]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const firstTime = getItem("FIRST_TIME")
    console.log("Firstime: ", firstTime)
    if (firstTime === undefined) {
      console.log("Loading firstime")
      try {
        loadDefaultExercises()
        setItem("FIRST_TIME", "FALSE")
      } catch (error) {
        console.error("Error loading the default exercises", error)
      }
    }
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar />
      <QueryClientProvider client={queryClient} >
        <RootLayoutNav />
      </QueryClientProvider>
    </>
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ title: "" }} initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
