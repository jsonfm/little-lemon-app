import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { theme } from "@/global/theme";

interface Props {
  category: string;
}

export const CategoryOption = ({ category }: Props) => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.text}>{category}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    // minHeight: 20,
    height: 25,
    paddingVertical: 4,
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "scroll",
    marginRight: 12,
  },
  scroll: {
    display: "flex",
  },
  text: {
    color: theme.colors.white,
  },
});
