import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/global/theme";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Image } from "expo-image";
import { assets } from "@/global/constants";
import { Link, router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
  // const { data, isLoading } = useGetMenu();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data: LoginSchemaType) => {
    setLoading(true);
    try {
      console.log({ data });
      router.navigate("/home");
    } catch (error) {}
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image
            contentFit="contain"
            source={assets.logo}
            style={styles.logo}
          />
        </View>
        <View style={styles.form}>
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

          <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit(onSubmit) as any}>Login</Button>
          </View>

          <Link href="/login/register" style={styles.registerLink}>
            <Text style={styles.registerLinkText}>
              Don't you have an account?
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
  buttonContainer: {
    marginTop: 20,
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerLinkText: {
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
});
