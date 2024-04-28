import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { assets } from "@/global/constants";
import { Image } from "expo-image";

const Home = () => {
  const animation = useRef(new Animated.Value(1));

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        Animated.timing(animation.current, {
          useNativeDriver: true,
          toValue: 1.1,
          duration: 500,
        }),
        // decrease size
        Animated.timing(animation.current, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1000,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        style={{
          transform: [{ scale: animation.current }],
          ...styles.logoContainer,
        }}
      >
        <Image contentFit="contain" source={assets.logo} style={styles.logo} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 200,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
