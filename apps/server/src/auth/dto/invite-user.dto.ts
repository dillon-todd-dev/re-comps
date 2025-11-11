import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { type UserRole } from 'src/drizzle/schema';

export class InviteUserDto {
  @IsEmail()
  email: string;

  @IsEnum(['ROLE_USER', 'ROLE_ADMIN'])
  role: UserRole;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
