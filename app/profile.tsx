import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { theme } from "@/global/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Button, Input } from "@/components/ui";
import { menuRepository } from "@/repositories/menu";
import { useSWRConfig } from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

const UpdateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string().min(3).max(20),
});

type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const { mutate } = useSWRConfig();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(UpdateProfileSchema),
  });

  const clearcache = async () => {
    mutate(
      (key) => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false } // do not revalidate
    );
    await menuRepository.deleteTable();
  };

  const logout = async () => {
    try {
      await clearcache();
    } catch (error) {}

    router.navigate("/login");
  };

  const onSubmit = (data: UpdateProfileSchemaType) => {
    setLoading(true);
    try {
      Toast.show({ type: "success", text1: "Register", text2: "Completed" });
      // console.log({ data });
      router.navigate("/login");
    } catch (error) {}
    setLoading(false);
  };

  return (
    <View>
      <ExpoStatusBar style="light" />
      <View style={[styles.upperContainer, [{ paddingTop: insets.top }]]}>
        <Link href="/home" style={styles.backLink}>
          Home
        </Link>
        <View style={styles.upperContentContainer}>
          <View style={styles.imageContainer}>
            <Image
              contentFit="cover"
              source="https://github.com/isakanderson-official/little-lemon/blob/main/assets/Profile.png?raw=true"
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
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
        <Button onPress={logout}>Logout</Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  form: {
    minHeight: 400,
  },
  backLink: {
    color: theme.colors.white,
  },
  upperContainer: {
    flex: 0.4,
    minHeight: 300,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.padding.lg,
  },
  upperContentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  lowerContainer: {
    flex: 1,
    minHeight: 200,
    paddingHorizontal: theme.padding.lg,
    paddingVertical: theme.padding.lg,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
