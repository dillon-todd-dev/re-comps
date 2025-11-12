import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SetPasswordDto } from 'src/auth/dto/set-password.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { type Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InviteUserDto } from 'src/auth/dto/invite-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decarator';
import { GetInvitationDto } from './dto/get-invitation.dto';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name, {
    timestamp: true,
  });

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(user);

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ROLE_ADMIN')
  @Post('invite')
  @HttpCode(HttpStatus.CREATED)
  async invite(@Body() inviteUserDto: InviteUserDto) {
    const invitation = await this.authService.inviteUser(inviteUserDto);
    if (!invitation) {
      return { error: 'Invitation not found' };
    }
    return { invitation };
  }

  @Get('invitation')
  @HttpCode(HttpStatus.OK)
  async getInvitation(@Body() getInvitationDto: GetInvitationDto) {
    return this.authService.getInvitation(getInvitationDto);
  }

  @Post('set-password')
  async setPassword(
    @Body() setPasswordDto: SetPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.setPassword(
      setPasswordDto.token,
      setPasswordDto.password,
    );

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: result.message,
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async currentUser(@CurrentUser() user: UserDto) {
    this.logger.log(`Getting current user: ${user?.email}`);
    return { user };
  }

  @Post('seed')
  async seed() {
    return this.authService.seed();
  }
}
