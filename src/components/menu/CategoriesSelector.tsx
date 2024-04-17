import { View, Text } from "react-native";
import React from "react";

interface Props {
  categories: string[];
}

export const CategoriesSelector = ({ categories }: Props) => {
  return (
    <View>
      <Text>CategoriesSelector</Text>
    </View>
  );
};
