import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db/mongodb';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Admin email is required' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || !password.trim()) {
      return NextResponse.json(
        { success: false, error: 'Admin password is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@hdflooringca.com').trim().toLowerCase();
    const envAdminPass = process.env.ADMIN_PASSWORD || 'admin123';

    let isMatched = false;
    let adminAccountEmail = normalizedEmail;

    // 1. Check MongoDB users collection first
    try {
      const usersCollection = await getUsersCollection();
      const dbUser = await usersCollection.findOne({ email: normalizedEmail });

      if (dbUser && dbUser.password && dbUser.role === 'admin') {
        const passValid = await comparePassword(password, dbUser.password);
        if (passValid) {
          isMatched = true;
          adminAccountEmail = dbUser.email;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB admin lookup fallback:', dbErr);
    }

    // 2. Fallback check against process.env.ADMIN_EMAIL / process.env.ADMIN_PASSWORD
    if (!isMatched && normalizedEmail === envAdminEmail) {
      if (envAdminPass.startsWith('$2a$') || envAdminPass.startsWith('$2b$')) {
        isMatched = await comparePassword(password, envAdminPass);
      } else {
        isMatched = password === envAdminPass || (await comparePassword(password, envAdminPass));
      }
    }

    if (isMatched) {
      // Issue secure JWT token for Admin
      const token = signToken(
        { role: 'admin', email: adminAccountEmail },
        '7d'
      );

      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
        token,
      });

      // Set HTTP-only Cookie for maximum security
      response.cookies.set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid admin email or password' },
        { status: 401 }
      );
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
