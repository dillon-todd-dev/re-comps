import { type NewUser } from 'src/drizzle/schema';
import { UsersService } from 'src/users/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        email: string;
        password: string | null;
        hasSetPassword: boolean;
        firstName: string;
        lastName: string;
        role: "ROLE_USER" | "ROLE_ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        hasSetPassword: boolean;
        firstName: string;
        lastName: string;
        role: "ROLE_USER" | "ROLE_ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(newUser: NewUser): Promise<{
        id: string;
        email: string;
        password: string | null;
        hasSetPassword: boolean;
        firstName: string;
        lastName: string;
        role: "ROLE_USER" | "ROLE_ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
