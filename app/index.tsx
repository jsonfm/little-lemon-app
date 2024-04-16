import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/global/theme";
import { Hero } from "@/components/layout/Hero";
import { useGetMenu } from "@/hooks/api/menu";
import Header from "@/components/layout/Header";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Home = () => {
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
  });
  const onSubmit = (data: LoginSchemaType) => {
    setLoading(true);
    try {
    } catch (error) {}
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <Hero
        heading="LittleLemon"
        subheading="Chicago"
        about="We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist."
        image="https://images.immediate.co.uk/production/volatile/sites/30/2021/07/NYC-style-hot-dogs-with-street-cart-onions-b473660.jpg"
      />
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
            />
          )}
          name="password"
        />

        <View>
          <Button onPress={handleSubmit(onSubmit) as any}>Login</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    // paddingHorizontal: theme.padding.md,
  },
  form: {
    paddingHorizontal: theme.padding.lg,
    gap: 40,
    paddingTop: theme.padding.md,
  },
});
