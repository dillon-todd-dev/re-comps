import { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
  res.status(200).json({ message: 'Login successful' });
}

export function logout(req: Request, res: Response) {
  res.status(200).json({ message: 'Logout successful' });
}
