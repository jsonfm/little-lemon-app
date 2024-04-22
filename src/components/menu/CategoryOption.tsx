import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { theme } from "@/global/theme";
import { useMenuStore } from "@/store/menu";

interface Props {
  category: string;
}

export const CategoryOption = ({ category }: Props) => {
  const { filters, setFilters } = useMenuStore();
  const isActive = filters?.findIndex((item) => item === category) > -1;

  const onPress = () => {
    const index = filters?.findIndex((item) => item === category);
    if (index > -1) {
      const items = filters?.splice(index, 0);
      setFilters(items);
    } else {
      const items = [...filters, category];
      setFilters(items);
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        isActive && { backgroundColor: theme.colors.secondary },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && { color: theme.colors.white }]}>
        {category}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    // minHeight: 20,
    height: 25,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "scroll",
    marginRight: 12,
    borderWidth: 1,
  },
  scroll: {
    display: "flex",
  },
  text: {
    color: theme.colors.black,
  },
});
