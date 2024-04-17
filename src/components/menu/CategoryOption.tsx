import { View, Text } from "react-native";
import React from "react";

interface Props {
  category: string;
}

export const CategoryOption = ({ category }: Props) => {
  return (
    <View>
      <Text>CategoryOption</Text>
    </View>
  );
};
