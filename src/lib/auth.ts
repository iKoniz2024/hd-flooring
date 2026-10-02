import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hd_flooring_secure_default_secret_key_change_in_production';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];
const SALT_ROUNDS = 12;

export interface TokenPayload extends JwtPayload {
  userId?: string;
  email?: string;
  role?: string;
}

/**
 * Securely hashes a plain text password using bcrypt (salt rounds = 12)
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a valid non-empty string');
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a plain text password with a hashed password
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  if (!password || !hashedPassword) return false;
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    return false;
  }
}

/**
 * Generates a signed JWT token
 */
export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = JWT_EXPIRES_IN): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });
}

/**
 * Verifies and decodes a JWT token safely
 */
export function verifyToken<T = TokenPayload>(token: string): T | null {
  if (!token || typeof token !== 'string') return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return decoded as T;
  } catch {
    return null;
  }
}

/**
 * Extracts JWT token from Authorization header or cookies
 */
export function getAuthTokenFromRequest(request: Request): string | null {
  // 1. Check Authorization: Bearer <token>
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  // 2. Check Cookie header (e.g. token=...)
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [key, val] = cookie.trim().split('=');
      if (key === 'token' || key === 'adminToken') {
        return decodeURIComponent(val);
      }
    }
  }

  return null;
}

/**
 * Middleware helper to authenticate requests
 */
export function verifyAuth(request: Request): TokenPayload | null {
  const token = getAuthTokenFromRequest(request);
  if (!token) return null;
  return verifyToken<TokenPayload>(token);
}
