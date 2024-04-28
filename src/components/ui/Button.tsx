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
  const buttonStyles = [
    styles.button,
    variant == "primary" && styles.primary,
    variant == "black" && styles.black,
  ];
  const textStyles = [
    styles.buttonContentText,
    variant == "primary" && styles.primaryText,
    variant == "secondary" && styles.secondaryText,
    variant == "black" && styles.blackText,
  ];
  return (
    <Pressable
      style={({ pressed }) =>
        [...buttonStyles, { opacity: pressed ? 0.8 : 1 }] as any
      }
      onPress={onPress}
      disabled={loading}
    >
      <Text style={textStyles}>{children}</Text>
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
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonContentText: {
    fontWeight: "bold",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  black: {
    backgroundColor: theme.colors.black,
  },
  blackText: {
    color: theme.colors.white,
  },
});
