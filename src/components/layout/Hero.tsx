import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/global/theme";
import { Image } from "expo-image";

interface Props {
  heading: string;
  subheading: string;
  about: string;
  image: string;
  withSearchBard?: boolean;
}

export const Hero = ({
  heading,
  subheading,
  about,
  image,
  withSearchBard,
}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subheading}>{subheading}</Text>
          <Text style={styles.about}>{about}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    // paddingHorizontal: theme.padding.md,
    height: 225,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textContainer: {
    width: "60%",
  },
  imageContainer: {
    width: "40%",
    height: 140,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heading: {
    color: theme.colors.primary,
    fontSize: 30,
  },
  subheading: {
    color: theme.colors.white,
    marginTop: 10,
  },
  about: {
    color: theme.colors.white,
    marginTop: 10,
  },
});
