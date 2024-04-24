import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { CategoryOption } from "./CategoryOption";
import { theme } from "@/global/theme";

interface Props {
  categories: string[];
}

export const CategoriesSelector = ({ categories }: Props) => {
  return (
    <View>
      <Text style={styles.title}>Order for Delivery</Text>
      <ScrollView style={styles.categoriesContainer} horizontal>
        {categories?.map((item, index) => (
          <CategoryOption key={`category-${index}`} category={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    // gap: 10,
    paddingHorizontal: theme.padding.lg,
    marginTop: 15,
    marginBottom: 15,
    paddingRight: 20,
    minHeight: 40,
  },
  title: {
    paddingHorizontal: theme.padding.lg,
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
