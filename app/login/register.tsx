import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { assets } from "@/global/constants";
import { Image } from "expo-image";
import { theme } from "@/global/theme";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Link, router } from "expo-router";
import { Button, Input } from "@/components/ui";
import Toast from "react-native-toast-message";
import { UsersService } from "@/services/users";

const RegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string().min(3).max(20),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true);
    try {
      const user = await UsersService.register(data);
      Toast.show({ type: "success", text1: "Register", text2: "Completed" });
      router.navigate("/login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Register",
        text2: error?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <Pressable
          onPress={() => router.navigate("/login")}
          style={styles.logoContainer}
        >
          <Image
            contentFit="contain"
            source={assets.logo}
            style={styles.logo}
            cachePolicy={"memory-disk"}
          />
        </Pressable>

        <View style={styles.form}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                value={value}
                onChangeText={onChange}
                error={errors?.firstName}
              />
            )}
            name="firstName"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                value={value}
                onChangeText={onChange}
                error={errors?.lastName}
              />
            )}
            name="lastName"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                type="text"
                placeholder="email@example.com"
                value={value}
                onChangeText={onChange}
                error={errors?.email}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                type="password"
                placeholder="****"
                value={value}
                onChangeText={onChange}
                error={errors?.password}
              />
            )}
            name="password"
          />
          <Button loading={loading} onPress={handleSubmit(onSubmit) as any}>
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
  logoContainer: {
    width: 200,
    height: 50,
    minHeight: 50,
    marginBottom: 30,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  form: {
    paddingHorizontal: theme.padding.lg,
    gap: 0,
    // gap: 40,
    // paddingTop: theme.padding.md,
  },
});
