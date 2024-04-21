import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
const Logo = require("@/../../assets/littleLemonLogo.png");

export const Header = () => {
  return (
    <View style={styles.header}>
      {/* <Text>Header</Text> */}
      <Image contentFit="contain" source={Logo} style={styles.logo} />
      <View style={styles.avatar}>
        <Image
          style={styles.avatarImage}
          contentFit="cover"
          source="https://github.com/isakanderson-official/little-lemon/blob/main/assets/Profile.png?raw=true"
        />
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
