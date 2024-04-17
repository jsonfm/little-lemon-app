import { View, Text } from "react-native";
import React from "react";

interface Props {
  dish: Dish;
}

export const DishItem = ({ dish }: Props) => {
  return (
    <View>
      <Text>DishItem</Text>
    </View>
  );
};
