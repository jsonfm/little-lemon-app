import { usersRepository } from "@/repositories/users";

export class UsersService {
  static login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const user = await usersRepository.getUserByEmail(email);
    console.log({ user });
    if (user?.password !== password) {
      throw new Error(`Wrong Password`);
    }
    return user;
  };
  static register = async (data: any) => {
    return await usersRepository.register(data);
  };
}
