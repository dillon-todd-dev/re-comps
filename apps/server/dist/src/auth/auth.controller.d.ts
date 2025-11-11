import { AuthService } from 'src/auth/auth.service';
import { SetPasswordDto } from 'src/auth/dto/set-password.dto';
import { type Response } from 'express';
import { UserDto } from 'src/users/dto/user.dto';
import { InviteUserDto } from 'src/auth/dto/invite-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: UserDto, res: Response): Promise<{
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    invite(inviteUserDto: InviteUserDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
    }>;
    setPassword(setPasswordDto: SetPasswordDto, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
    }>;
    seed(): Promise<{
        password: string | null;
        id: string;
        email: string;
        hasSetPassword: boolean;
        firstName: string;
        lastName: string;
        role: "ROLE_USER" | "ROLE_ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
