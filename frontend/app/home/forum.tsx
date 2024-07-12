import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/constants/api";
import { useFocusEffect } from "expo-router";

const Page = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => fetch(`${API}/post/all`)
  })

  useFocusEffect(useCallback(() => { refetch() }, []))

  return (
    <View style={{ flex: 1 }}>
      <Text>Forum</Text>
      <Text>Data: {data && JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
