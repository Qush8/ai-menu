import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { Role } from '@prisma/client';

const SALT_ROUNDS = 10;

interface RegisterBody {
  companyName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

export const register = async (req: Request<object, object, RegisterBody>, res: Response): Promise<void> => {
  const { companyName, email, password, confirmPassword, phoneNumber } = req.body;

  if (!companyName?.trim() || !email?.trim() || !password || !confirmPassword || !phoneNumber?.trim()) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match' });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (existing) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      companyName: companyName.trim(),
      email: email.trim().toLowerCase(),
      password: hashed,
      phoneNumber: phoneNumber.trim(),
      role: 'ADMIN' as Role,
    } as any,
  }) as any;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Server misconfiguration' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    secret,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'Registration successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      companyName: user.companyName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
};

export const login = async (req: Request<object, object, LoginBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email?.trim() || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  }) as any;
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Server misconfiguration' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    secret,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      companyName: user.companyName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
};
