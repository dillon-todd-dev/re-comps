import { JwtService } from '@nestjs/jwt';
import { type DrizzleDB } from 'src/drizzle/drizzle.provider';
import { InvitationWithUser } from 'src/drizzle/schema';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { InviteUserDto } from 'src/auth/dto/invite-user.dto';
import { EmailService } from 'src/email/email.service';
import { GetInvitationDto } from './dto/get-invitation.dto';
export declare class AuthService {
    private db;
    private usersService;
    private jwtService;
    private emailService;
    private readonly logger;
    constructor(db: DrizzleDB, usersService: UsersService, jwtService: JwtService, emailService: EmailService);
    validateUser(email: string, password: string): Promise<UserDto | null>;
    generateToken(user: UserDto): string;
    login(user: UserDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
    }>;
    inviteUser(inviteUserDto: InviteUserDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
    }>;
    getInvitation(getInvitationDto: GetInvitationDto): Promise<InvitationWithUser | null>;
    setPassword(token: string, password: string): Promise<{
        message: string;
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: "ROLE_USER" | "ROLE_ADMIN";
        };
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
