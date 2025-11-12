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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_provider_1 = require("../drizzle/drizzle.provider");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
let UsersService = class UsersService {
    db;
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        return this.db.select().from(schema_1.usersTable);
    }
    async findById(id) {
        const [user] = await this.db
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
        return user;
    }
    async findByEmail(email) {
        const [user] = await this.db
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
        return user;
    }
    async create(newUser) {
        const [user] = await this.db.insert(schema_1.usersTable).values(newUser).returning();
        return user;
    }
    async getInvitation(token) {
        const [result] = await this.db
            .select()
            .from(schema_1.userInvitationsTable)
            .innerJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.userInvitationsTable.userId, schema_1.usersTable.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userInvitationsTable.token, token), (0, drizzle_orm_1.eq)(schema_1.userInvitationsTable.used, false), (0, drizzle_orm_1.gt)(schema_1.userInvitationsTable.expiresAt, new Date())));
        if (!result) {
            return null;
        }
        const { userId, ...invitation } = result.user_invitations;
        return { ...invitation, user: result.users };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map