import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ConfigService } from '@nestjs/config';
import * as schema from './schema';
export declare const DrizzleAsyncProvider = "DrizzleAsyncProvider";
export type DrizzleDB = NodePgDatabase<typeof schema>;
export declare const drizzleProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<DrizzleDB>;
}[];
