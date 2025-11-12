import { type DrizzleDB } from 'src/drizzle/drizzle.provider';
import { InvitationWithUser, NewUser, User } from 'src/drizzle/schema';
export declare class UsersService {
    private db;
    constructor(db: DrizzleDB);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(newUser: NewUser): Promise<User>;
    getInvitation(token: string): Promise<InvitationWithUser | null>;
}
