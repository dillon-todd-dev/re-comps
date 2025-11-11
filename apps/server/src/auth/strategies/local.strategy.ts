import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(LocalStrategy.name, {
    timestamp: true,
  });

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  SERVICE: string = LocalStrategy.name;

  async validate(email: string, password: string): Promise<UserDto> {
    this.logger.log(`Validing user: ${email}`);

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.logger.error('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`Validated user: ${user.email}`);

    return user;
  }
}
