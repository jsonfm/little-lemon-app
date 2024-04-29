import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = `AUTH_KEY`;

export class AuthStorage {
  static saveAuth = async (data: any) => {
    const string = JSON.stringify(data);
    await AsyncStorage.setItem(AUTH_KEY, string);
  };
  static getAuth = async () => {
    const data = await AsyncStorage.getItem(AUTH_KEY);
    if (!data) return;
    const json = JSON.parse(data);
    return json;
  };

  static clearAuth = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
  };

  static getCurrentUser = async () => {
    const data = await AsyncStorage.getItem(AUTH_KEY);
    if (!data) {
      throw new Error(`user not found`);
    }
    return data;
  };
}
