import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SWRProviderConfig } from "@/config/swr";

const Layout = () => {
  return (
    <SWRProviderConfig>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </SWRProviderConfig>
  );
};

export default Layout;
