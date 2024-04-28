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
    if (user?.password !== password) {
      throw new Error(`Wrong Password`);
    }
    return user;
  };
}
