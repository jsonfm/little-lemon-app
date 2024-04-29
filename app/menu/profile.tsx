import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { theme } from "@/global/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Button, Input } from "@/components/ui";
import { menuRepository } from "@/repositories/menu";
import { useSWRConfig } from "swr";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/auth";
import { usersRepository } from "@/repositories/users";
import { UsersService } from "@/services/users";

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
    logout: logoutSession,
    user,
    mutate: mutateAuth,
    setUser,
  } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateProfileSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(UpdateProfileSchema),
  });

  useEffect(() => {
    if (!user) return;
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("email", user?.email);
    setValue("password", user?.password);
  }, [user, setValue]);

  const clearcache = async () => {
    mutate(
      (key) => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false } // do not revalidate
    );
    // await menuRepository.deleteTable();
    // await usersRepository.deleteTable();
  };

  const logout = async () => {
    setLoading(true);
    try {
      await clearcache();
      await logoutSession();
      router.navigate("/login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Profile",
        text2: error?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    setLoading(true);
    try {
      let body: any = {};
      Object.keys(data || {})?.forEach((key) => {
        const value = (data as any)?.[key];
        const current = user?.[key];
        if (value !== current) {
          body[key] = value;
        }
      });
      const updated = await UsersService.update(user?.id, body);

      setUser(updated);
      Toast.show({ type: "success", text1: "Profile", text2: "Completed" });
    } catch (error: any) {
      Toast.show({ type: "error", text1: "Profile", text2: error?.message });
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, zIndex: -1 }}
    >
      <ScrollView style={{ flex: 1, zIndex: -1 }}>
        <ExpoStatusBar style="light" />
        <View style={[styles.upperContainer, [{ paddingTop: insets.top }]]}>
          <Link href="/menu/home" style={styles.backLink}>
            Home
          </Link>
          <View style={styles.upperContentContainer}>
            <View style={styles.imageContainer}>
              <Text style={styles.avatarText}>
                {user?.firstName?.[0]} {user?.lastName?.[0]}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.form}
          >
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
              Update
            </Button>
            <View style={{ marginTop: 12 }}>
              <Button variant="secondary" onPress={logout}>
                Logout
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  form: {
    minHeight: 400,
    flex: 0.5,
    paddingBottom: 200,
    overflow: "scroll",
  },
  backLink: {
    color: theme.colors.white,
  },
  upperContainer: {
    flex: 0.3,
    minHeight: 250,
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
    minWidth: 100,
    minHeight: 100,
    borderRadius: 80,
    overflow: "hidden",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: theme.colors.black,
    fontSize: 36,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
