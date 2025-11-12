import { Injectable, Inject } from '@nestjs/common';
import {
  DrizzleAsyncProvider,
  type DrizzleDB,
} from 'src/drizzle/drizzle.provider';
import {
  InvitationWithUser,
  NewUser,
  User,
  UserInvitation,
  userInvitationsTable,
  usersTable,
} from 'src/drizzle/schema';
import { and, eq, gt } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}

  async findAll(): Promise<User[]> {
    return this.db.select().from(usersTable);
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user;
  }

  async create(newUser: NewUser): Promise<User> {
    const [user] = await this.db.insert(usersTable).values(newUser).returning();
    return user;
  }

  async getInvitation(token: string): Promise<InvitationWithUser | null> {
    const [result] = await this.db
      .select()
      .from(userInvitationsTable)
      .innerJoin(usersTable, eq(userInvitationsTable.userId, usersTable.id))
      .where(
        and(
          eq(userInvitationsTable.token, token),
          eq(userInvitationsTable.used, false),
          gt(userInvitationsTable.expiresAt, new Date()),
        ),
      );

    if (!result) {
      return null;
    }

    const { userId, ...invitation } = result.user_invitations;

    return { ...invitation, user: result.users };
  }
}
