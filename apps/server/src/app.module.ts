import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
