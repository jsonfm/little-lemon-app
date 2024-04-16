import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { theme } from "@/global/theme";
import { Entypo } from "@expo/vector-icons";

interface Props {
  label?: string;
  type?: "text" | "password";
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChangeText,
}: Props) => {
  const isPassword = type == "password";
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={isPassword ? showPassword : false}
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
        {isPassword && (
          <Pressable onPress={toggleShowPassword}>
            <Text>
              {showPassword ? (
                <Entypo name="eye" size={24} color={theme.colors.gray} />
              ) : (
                <Entypo
                  name="eye-with-line"
                  size={24}
                  color={theme.colors.gray}
                />
              )}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    minWidth: 300,
    paddingHorizontal: 4,
    flex: 1,
    gap: 4,
  },
  label: {},
  inputContainer: {
    height: 40,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    height: 40,
  },
});
