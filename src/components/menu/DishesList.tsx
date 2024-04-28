import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { DishItem } from "./DishItem";
import { theme } from "@/global/theme";
import { useMenuStore } from "@/store/menu";

interface Props {
  dishes?: Dish[];
  loading?: boolean;
}

export const DishesList = ({ dishes, loading }: Props) => {
  const [filtered, setFiltered] = useState<Dish[]>([]);
  const { query, filters } = useMenuStore();

  useEffect(() => {
    if (!dishes?.length) return;
    const category = filters?.[0];
    let items = [];
    if (!!query && query?.length > 3) {
      items = dishes?.filter(
        (item) =>
          item?.name
            ?.toLocaleLowerCase()
            ?.includes(query?.toLocaleLowerCase()) ||
          item?.description
            ?.toLocaleLowerCase()
            ?.includes(query?.toLocaleLowerCase())
      );
    } else {
      items = dishes;
    }

    if (!!category) {
      const result = items?.filter(
        (item) =>
          item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      );
      setFiltered(result);
    } else {
      setFiltered(items);
    }
  }, [dishes, query, filters]);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={filtered}
        style={styles.list}
        keyExtractor={(_, index) => `dish-${index}`}
        renderItem={({ item }) => <DishItem dish={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // paddingHorizontal: theme.padding.lg,
    flex: 1,
    // borderWidth: 2,
    minHeight: 500,
    paddingBottom: 30,
  },
  list: {
    gap: 10,
    paddingHorizontal: theme.padding.lg,
  },
});
