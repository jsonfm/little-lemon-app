import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SWRProviderConfig } from "@/config/swr";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "@/context/auth";

const Layout = () => {
  const insets = useSafeAreaInsets();
  return (
    <SWRProviderConfig>
      <AuthContextProvider>
        <SafeAreaProvider>
          <Toast topOffset={insets.top} />
          <Slot />
        </SafeAreaProvider>
      </AuthContextProvider>
    </SWRProviderConfig>
  );
};

export default Layout;
