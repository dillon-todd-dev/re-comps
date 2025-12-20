import { usersTable } from '@src/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof usersTable>;
