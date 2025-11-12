import { AuthService } from 'src/auth/auth.service';
import { SetPasswordDto } from 'src/auth/dto/set-password.dto';
import { type Response } from 'express';
import { UserDto } from 'src/users/dto/user.dto';
import { InviteUserDto } from 'src/auth/dto/invite-user.dto';
import { GetInvitationDto } from './dto/get-invitation.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
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
        error: string;
        invitation?: undefined;
    } | {
        invitation: {
            message: string;
            user: {
                id: string;
                email: string;
                role: "ROLE_USER" | "ROLE_ADMIN";
            };
        };
        error?: undefined;
    }>;
    getInvitation(getInvitationDto: GetInvitationDto): Promise<import("../drizzle/schema").InvitationWithUser | null>;
    setPassword(setPasswordDto: SetPasswordDto, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
    }>;
    currentUser(user: UserDto): Promise<{
        user: UserDto;
    }>;
    seed(): Promise<{
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
}
