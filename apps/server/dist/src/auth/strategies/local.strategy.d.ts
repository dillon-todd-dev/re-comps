import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/users/dto/user.dto';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<UserDto>;
}
export {};
