import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/auth.js';
import { validateSignup, validateLogin } from '../utils/validation.js';

const router = express.Router();
const prisma = new PrismaClient();

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    let { name, email, password, role } = req.body ?? {};

    // Defensive normalization of inputs
    name = typeof name === 'string' ? name.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password : '';

    // Normalize role safely (only convert if it's a string)
    role = typeof role === 'string' ? role.trim().toUpperCase() : 'USER';

    // Basic validation (you can keep using validateSignup but re-run here for safety)
    const validation = validateSignup({ name, email, password, role });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors[0] });
    }

    // Check if user exists (use email in same case as lookup)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER'
      }
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    // Detailed error logging for debugging
    console.error('Signup error (name, email):', req.body?.name, req.body?.email);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);

    // If it's a Prisma unique constraint error (duplicate key), handle gracefully
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Unique constraint failed: a user with this email already exists' });
      }
    }

    // In development, return the full error (helpful while debugging)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ error: error?.message || 'Signup failed', stack: error?.stack });
    }

    // Generic production response
    return res.status(500).json({ error: 'Signup failed' });
  }
});


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors[0] });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET CURRENT USER
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;