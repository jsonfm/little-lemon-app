import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/global/theme";
import { useGetCategories, useGetMenu } from "@/hooks/api/menu";

// components
import { Header, Hero } from "@/components/layout";
import { DishesList, CategoriesSelector } from "@/components/menu";

const Home = () => {
  const { data: dishes, isLoading: loadingDishes } = useGetMenu();
  const { categories } = useGetCategories();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <Hero
        heading="LittleLemon"
        subheading="Chicago"
        about="We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist."
        image="https://images.immediate.co.uk/production/volatile/sites/30/2021/07/NYC-style-hot-dogs-with-street-cart-onions-b473660.jpg"
      />
      <CategoriesSelector categories={categories} />
      <DishesList dishes={dishes} loading={loadingDishes} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    // paddingHorizontal: theme.padding.md,
  },
  form: {
    paddingHorizontal: theme.padding.lg,
    gap: 40,
    paddingTop: theme.padding.md,
  },
});
