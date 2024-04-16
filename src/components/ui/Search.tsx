import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Search = () => {
  return (
    <View>
      <Feather name="search" size={24} color="black" />
      <Text>Search</Text>
    </View>
  );
};

export default Search;
