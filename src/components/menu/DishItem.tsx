import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";

interface Props {
  dish: Dish;
}

export const DishItem = ({ dish }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{dish?.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish?.description}
        </Text>
        <Text>$ {dish?.price?.toFixed(2)}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image contentFit="cover" source={dish?.image} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    // padding: 10,
    flexDirection: "row",
    marginBottom: 20,
    // paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 0.7,
    paddingRight: 20,
  },
  title: {
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    marginBottom: 6,
    fontSize: 12,
  },
  price: {
    fontSize: 13,
  },
  imageContainer: {
    flex: 0.3,
    width: 100,
    height: 80,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
