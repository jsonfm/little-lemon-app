import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { theme } from "@/global/theme";

interface Props {
  children: ReactNode;
  variant?: keyof typeof theme.colors;
  onPress?: () => void;
  loading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  onPress,
  loading = false,
}: Props) => {
  const buttonStyles = [styles.button, variant == "primary" && styles.primary];
  return (
    <Pressable
      style={({ pressed }) => [...buttonStyles, { opacity: pressed ? 0.8 : 1 }]}
      onPress={onPress}
      disabled={loading}
    >
      <Text>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.white,
  },
});
