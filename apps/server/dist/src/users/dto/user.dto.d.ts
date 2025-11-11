import { UserRole } from 'src/drizzle/schema';
export declare class UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isActive: boolean;
    hasSetPassword: boolean;
    createdAt: Date;
    updatedAt: Date;
}
