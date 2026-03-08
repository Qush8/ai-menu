import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { Role } from '@prisma/client';

const SALT_ROUNDS = 10;

const registerSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

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
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: validation.error.issues[0].message });
    return;
  }

  const { companyName, email, password, phoneNumber } = validation.data;

  // Check if passwords match (if confirmPassword is sent, though not in schema)
  if (req.body.confirmPassword && password !== req.body.confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match' });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (existing) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  try {
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

    // We don't necessarily need to return a token on register if we want them to login, 
    // but the previous implementation did, so we keep it or follow docs.
    // Docs say: 201 Created with a message and the user ID (excluding password).
    
    res.status(201).json({
      message: 'Registration successful',
      userId: user.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
