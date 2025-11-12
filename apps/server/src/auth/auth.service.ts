import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import {
  DrizzleAsyncProvider,
  type DrizzleDB,
} from 'src/drizzle/drizzle.provider';
import { InvitationWithUser, usersTable } from 'src/drizzle/schema';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { InviteUserDto } from 'src/auth/dto/invite-user.dto';
import { EmailService } from 'src/email/email.service';
import { GetInvitationDto } from './dto/get-invitation.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @Inject(DrizzleAsyncProvider) private db: DrizzleDB,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    this.logger.log(`Validating user: ${email}`);

    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      return null;
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account not active');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;

    return result;
  }

  generateToken(user: UserDto) {
    this.logger.log(`Generating token: ${user.id}`);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async login(user: UserDto) {
    const accessToken = this.generateToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async inviteUser(inviteUserDto: InviteUserDto) {
    const existingUser = await this.usersService.findByEmail(
      inviteUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const invitationToken = this.jwtService.sign(
      {
        email: inviteUserDto.email,
        role: inviteUserDto.role,
        type: 'invitation',
      },
      { expiresIn: '7d' },
    );

    const [user] = await this.db
      .insert(usersTable)
      .values({
        email: inviteUserDto.email,
        role: inviteUserDto.role,
        firstName: inviteUserDto.firstName,
        lastName: inviteUserDto.lastName,
        isActive: false,
        hasSetPassword: false,
      })
      .returning();

    try {
      await this.emailService.sendInvitationEmail(
        inviteUserDto.email,
        invitationToken,
      );
    } catch (err) {
      console.error('Failed to send invitation email:', err);
    }

    return {
      message: 'Invitation sent',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getInvitation(
    getInvitationDto: GetInvitationDto,
  ): Promise<InvitationWithUser | null> {
    return this.usersService.getInvitation(getInvitationDto.token);
  }

  async setPassword(token: string, password: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }

    if (payload.type !== 'invitation') {
      throw new BadRequestException('Invalid token type');
    }

    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [updatedUser] = await this.db
      .update(usersTable)
      .set({
        password: hashedPassword,
        hasSetPassword: true,
        isActive: true,
      })
      .where(eq(usersTable.id, user.id))
      .returning();

    const accessToken = this.generateToken(updatedUser);

    return {
      message: 'Password set successfully',
      accessToken,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    };
  }

  async seed() {
    const hashedPassword = await bcrypt.hash('Admin123', 10);
    return this.db
      .insert(usersTable)
      .values({
        email: 'dillontodd.dev@gmail.com',
        password: hashedPassword,
        hasSetPassword: true,
        isActive: true,
        firstName: 'Dillon',
        lastName: 'Todd',
      })
      .returning();
  }
}
