import { usersTable } from '@src/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof usersTable>;
export enum UserRole {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}
