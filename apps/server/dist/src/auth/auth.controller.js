"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const set_password_dto_1 = require("./dto/set-password.dto");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const user_dto_1 = require("../users/dto/user.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const invite_user_dto_1 = require("./dto/invite-user.dto");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decarator_1 = require("./decorators/roles.decarator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(user, res) {
        const result = await this.authService.login(user);
        res.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return {
            user: result.user,
        };
    }
    async logout(res) {
        res.clearCookie('access_token');
        return { message: 'Logged out successfully' };
    }
    async invite(inviteUserDto) {
        return this.authService.inviteUser(inviteUserDto);
    }
    async setPassword(setPasswordDto, res) {
        const result = await this.authService.setPassword(setPasswordDto.token, setPasswordDto.password);
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
    async seed() {
        return this.authService.seed();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decarator_1.Roles)('ROLE_ADMIN'),
    (0, common_1.Post)('invite'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invite_user_dto_1.InviteUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "invite", null);
__decorate([
    (0, common_1.Post)('set-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_password_dto_1.SetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPassword", null);
__decorate([
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "seed", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map