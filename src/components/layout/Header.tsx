import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
const Logo = require("@/../../assets/littleLemonLogo.png");

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.containerOne}></View>
      <View style={styles.containerTwo}>
        <Image contentFit="contain" source={Logo} style={styles.logo} />
        <Pressable
          style={styles.avatar}
          onPress={() => router.push("/profile")}
        >
          <Image
            style={styles.avatarImage}
            contentFit="cover"
            source="https://github.com/isakanderson-official/little-lemon/blob/main/assets/Profile.png?raw=true"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    minHeight: 50,
    paddingHorizontal: 10,
    // backgroundColor: "red",
  },
  containerOne: {
    flex: 0.36,
    flexDirection: "row",
  },
  containerTwo: {
    flex: 0.64,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  logo: {
    height: 30,
    width: 100,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
