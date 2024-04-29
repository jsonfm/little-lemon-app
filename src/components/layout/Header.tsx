import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { theme } from "@/global/theme";
import { useAuth } from "@/context/auth";
const Logo = require("@/../../assets/littleLemonLogo.png");

export const Header = () => {
  const { user } = useAuth();
  return (
    <View style={styles.header}>
      <View style={styles.containerOne}></View>
      <View style={styles.containerTwo}>
        <Image contentFit="contain" source={Logo} style={styles.logo} />
        <Pressable
          style={styles.avatar}
          onPress={() => router.navigate("/menu/profile")}
        >
          <Text style={styles.avatarText}>
            {user?.firstName?.[0]} {user?.lastName?.[0]}
          </Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
