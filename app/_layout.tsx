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
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const Layout = () => {
  const insets = useSafeAreaInsets();
  return (
    <SWRProviderConfig>
      <AuthContextProvider>
        <ExpoStatusBar style="dark" />
        <SafeAreaProvider>
          <Toast topOffset={insets.top} />
          <Slot />
        </SafeAreaProvider>
      </AuthContextProvider>
    </SWRProviderConfig>
  );
};

export default Layout;
