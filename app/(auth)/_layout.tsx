import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/providers/AuthProvider";

const AuthLayout = () => {
  const { session } = useAuth();

  if (session) {
    return (
      <Redirect href="/" />
    )
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default AuthLayout;
