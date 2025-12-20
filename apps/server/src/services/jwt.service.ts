import { jwtVerify, SignJWT } from 'jose';
import { env } from '@src/config/env';
import { JwtPayload } from '@src/types/auth.types';

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function generateToken(
  userId: string,
  role: string,
): Promise<string> {
  const payload = { sub: userId, role };
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as JwtPayload;
}
