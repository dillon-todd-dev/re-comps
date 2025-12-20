import { Request, Response } from 'express';
import crypto from 'crypto';
import log from '@src/logger';
import { db } from '@src/db';
import { userInvitationsTable, usersTable } from '@src/db/schema';
import { eq } from 'drizzle-orm';
import { sendInvitationEmail } from '@src/services/email.service';

export async function createUser(req: Request, res: Response) {
  const { email, firstName, lastName, role } = req.body;
  if (!email || !firstName || !lastName || !role) {
    res
      .status(400)
      .json({ message: 'Email, firstName, lastName, and role are required' });
    return;
  }

  try {
    await db.transaction(async (tx) => {
      const [existingUser] = await tx
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (existingUser) {
        log.info({ email }, 'User with email already exists');
        res.status(422).json({ message: 'User with email already exists' });
        return;
      }

      const [newUser] = await tx
        .insert(usersTable)
        .values({
          email,
          firstName,
          lastName,
          role,
          password: null,
          hasSetPassword: false,
        })
        .returning();

      const token = crypto.randomBytes(32).toString('hex');

      await tx.insert(userInvitationsTable).values({
        userId: newUser.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      await sendInvitationEmail(email, firstName, lastName, token);
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    log.error({ err, email }, 'Error creating user');
    res.status(500).json({ message: 'Internal server error' });
  }
}
