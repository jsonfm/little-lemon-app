import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
const Logo = require("@/../../assets/littleLemonLogo.png");

const Header = () => {
  return (
    <View style={styles.header}>
      {/* <Text>Header</Text> */}
      <Image contentFit="contain" source={Logo} style={styles.logo} />
    </View>
  );
};

export default Header;

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
});
