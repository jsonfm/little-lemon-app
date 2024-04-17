import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { theme } from "@/global/theme";
import { Entypo } from "@expo/vector-icons";
import { FieldError } from "react-hook-form";

interface Props {
  label?: string;
  type?: "text" | "password";
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: FieldError;
}

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChangeText,
  error,
}: Props) => {
  const isPassword = type == "password";
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, !!error && { color: theme.colors.error }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          !!error && { borderColor: theme.colors.error },
        ]}
      >
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
      {!!error && <Text style={styles.errorText}>{error?.message}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    // minHeight: 40,
    maxHeight: 90,
    height: 40,
    minWidth: 300,
    paddingHorizontal: 4,
    flex: 1,
    gap: 4,
  },
  label: {
    fontWeight: "bold",
  },
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
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
  },
});
