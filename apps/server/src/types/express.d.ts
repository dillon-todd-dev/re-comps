import { UserDto } from 'src/users/dto/user.dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}
