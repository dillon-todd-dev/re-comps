import { Global, Module } from '@nestjs/common';
import {
  DrizzleAsyncProvider,
  drizzleProvider,
} from 'src/drizzle/drizzle.provider';

@Global()
@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
