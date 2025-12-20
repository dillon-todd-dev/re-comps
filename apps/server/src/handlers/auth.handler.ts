import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import log from '@src/logger';
import * as jwtService from '@src/services/jwt.service';
import { db } from '@src/db';
import { usersTable } from '@src/db/schema';
import { eq } from 'drizzle-orm';
import { env } from '@src/config/env';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    res.status(403).json({ message: 'Invalid credentials' });
    return;
  }

  const token = await jwtService.generateToken(user.id, user.role);

  res.cookie('auth', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
    path: '/',
  });

  res.status(200).json({ message: 'Login successful' });
}

export function logout(req: Request, res: Response) {
  log.debug({ email: req.user?.email }, 'Logging out user');
  res.clearCookie('auth');
  res.status(204);
}
