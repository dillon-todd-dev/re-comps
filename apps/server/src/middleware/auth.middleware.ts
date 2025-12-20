import { Request, Response, NextFunction } from 'express';
import * as jwtService from '@src/services/jwt.service';
import { db } from '@src/db';
import { usersTable } from '@src/db/schema';
import { eq } from 'drizzle-orm';
import { UserRole } from '@src/types/user.types';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = req.cookies['auth'];
  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = await jwtService.verifyToken(auth);
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, payload.sub));

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== UserRole.ADMIN) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
}
