import { View, Text, TextInput } from "react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/global/theme";
import { useDebounce, useDebounceValue } from "@/hooks/utils";
import { useMenuStore } from "@/store/menu";

interface Props {
  placeholder?: string;
}

export const Search = ({ placeholder = "Search..." }: Props) => {
  const { setQuery } = useMenuStore();
  const { value, setValue, debounced } = useDebounceValue("", 400);
  useEffect(() => {
    setQuery(debounced);
    // console.log({ debounced });
  }, [debounced]);
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color={theme.colors.white} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 35,
  },
  input: {
    width: "90%",
    color: theme.colors.white,
    height: 30,
  },
});
