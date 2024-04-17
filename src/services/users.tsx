import AsyncStorage from "@react-native-async-storage/async-storage";

export class UsersService {
  static login = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {};
  static getCurrentUser = async () => {
    const data = await AsyncStorage.getItem("user");
    return data;
  };
}
