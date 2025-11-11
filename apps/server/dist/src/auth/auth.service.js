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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const drizzle_orm_1 = require("drizzle-orm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const drizzle_provider_1 = require("../drizzle/drizzle.provider");
const schema_1 = require("../drizzle/schema");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    db;
    usersService;
    jwtService;
    emailService;
    constructor(db, usersService, jwtService, emailService) {
        this.db = db;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.password) {
            return null;
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account not active');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const { password: _, ...result } = user;
        return result;
    }
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
    async login(user) {
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
    async inviteUser(inviteUserDto) {
        const existingUser = await this.usersService.findByEmail(inviteUserDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const invitationToken = this.jwtService.sign({
            email: inviteUserDto.email,
            role: inviteUserDto.role,
            type: 'invitation',
        }, { expiresIn: '7d' });
        const [user] = await this.db
            .insert(schema_1.usersTable)
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
            await this.emailService.sendInvitationEmail(inviteUserDto.email, invitationToken);
        }
        catch (err) {
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
    async setPassword(token, password) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        if (payload.type !== 'invitation') {
            throw new common_1.BadRequestException('Invalid token type');
        }
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const [updatedUser] = await this.db
            .update(schema_1.usersTable)
            .set({
            password: hashedPassword,
            hasSetPassword: true,
            isActive: true,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, user.id))
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
        const hashedPassword = await bcryptjs_1.default.hash('Admin123', 10);
        return this.db
            .insert(schema_1.usersTable)
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map