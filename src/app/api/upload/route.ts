import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { uploadToGridFS } from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate clean unique filename
    const fileExt = path.extname(file.name) || '.jpg';
    const sanitizeBaseName = path
      .basename(file.name, fileExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const filename = `${sanitizeBaseName || 'image'}-${uniqueSuffix}${fileExt}`;

    // 1. Primary storage: Save directly to MongoDB Atlas GridFS
    // This works everywhere (Vercel, cPanel, VPS, localhost) and has ZERO filesystem dependency
    await uploadToGridFS(filename, buffer, file.type || 'image/jpeg');

    // 2. Local filesystem write (optional cache, strictly non-blocking)
    // On serverless environments (Vercel Lambda) the filesystem is read-only (EROFS).
    // On cPanel/VPS/local dev it will also write to disk.
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
    } catch {
      // Safely ignore filesystem errors on read-only environments
    }

    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Image upload failed';
    console.error('POST /api/upload error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
