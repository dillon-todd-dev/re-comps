"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInvitationsTable = exports.usersTable = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
const pg_core_5 = require("drizzle-orm/pg-core");
const pg_core_6 = require("drizzle-orm/pg-core");
exports.userRoleEnum = (0, pg_core_6.pgEnum)('user_role', ['ROLE_USER', 'ROLE_ADMIN']);
exports.usersTable = (0, pg_core_5.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    email: (0, pg_core_4.text)('email').notNull().unique(),
    password: (0, pg_core_4.text)('password'),
    hasSetPassword: (0, pg_core_2.boolean)('has_set_password').notNull().default(false),
    firstName: (0, pg_core_4.text)('first_name').notNull(),
    lastName: (0, pg_core_4.text)('last_name').notNull(),
    role: (0, exports.userRoleEnum)('role').notNull().default('ROLE_USER'),
    isActive: (0, pg_core_2.boolean)('is_active').notNull().default(false),
    createdAt: (0, pg_core_3.timestamp)('created_at', { mode: 'date', withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_3.timestamp)('updated_at', { mode: 'date', withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.userInvitationsTable = (0, pg_core_5.pgTable)('user_invitations', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id')
        .references(() => exports.usersTable.id)
        .notNull()
        .unique(),
    token: (0, pg_core_4.text)('token').notNull().unique(),
    expiresAt: (0, pg_core_3.timestamp)('expires_at', {
        mode: 'date',
        withTimezone: true,
    }).notNull(),
    used: (0, pg_core_2.boolean)('used').default(false),
    usedAt: (0, pg_core_3.timestamp)('used_at', { mode: 'date', withTimezone: true }),
    createdAt: (0, pg_core_3.timestamp)('created_at', { mode: 'date', withTimezone: true })
        .defaultNow()
        .notNull(),
});
//# sourceMappingURL=users.schema.js.map