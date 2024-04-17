import { View, Text, FlatList } from "react-native";
import React from "react";
import { DishItem } from "./DishItem";

interface Props {
  dishes?: Dish[];
  loading?: boolean;
}

export const DishesList = ({ dishes, loading }: Props) => {
  return (
    <View>
      <FlatList
        data={dishes}
        keyExtractor={(_, index) => `dish-${index}`}
        renderItem={({ item }) => <DishItem dish={item} />}
      />
    </View>
  );
};
