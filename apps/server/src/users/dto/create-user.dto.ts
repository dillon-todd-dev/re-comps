import { UserRole } from 'src/drizzle/schema';

export type CreateUserDto = {
  email: string;
  role: UserRole;
};
