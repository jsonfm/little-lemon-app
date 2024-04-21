import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { DishItem } from "./DishItem";
import { theme } from "@/global/theme";

interface Props {
  dishes?: Dish[];
  loading?: boolean;
}

export const DishesList = ({ dishes, loading }: Props) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={dishes}
        style={styles.list}
        keyExtractor={(_, index) => `dish-${index}`}
        renderItem={({ item }) => <DishItem dish={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: theme.padding.lg,
  },
  list: {
    gap: 10,
  },
});
