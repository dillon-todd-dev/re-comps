import { type UserRole } from 'src/drizzle/schema';
export declare class InviteUserDto {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
}
