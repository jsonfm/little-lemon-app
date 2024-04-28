import { z } from "zod";

export const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
