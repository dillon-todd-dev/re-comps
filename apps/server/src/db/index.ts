import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@src/config/env';
import * as schema from '@src/db/schema';

export const db = drizzle({ schema, connection: env.DATABASE_URL });
