import { View, Text } from "react-native";
import { Slot } from "expo-router";
import React from "react";
import { AuthRequiredView } from "@/context/auth";

const MenuLayout = () => {
  return (
    <AuthRequiredView>
      <Slot />
    </AuthRequiredView>
  );
};

export default MenuLayout;
