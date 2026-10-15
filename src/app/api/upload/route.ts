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
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|ogg|ogv|mov|m4v|mkv)$/i.test(file.name);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { success: false, error: 'Only image or video files are allowed (MP4, WebM, MOV, JPG, PNG, WEBP)' },
        { status: 400 }
      );
    }

    // Size limits: 20MB for images, 100MB for videos
    const maxSizeBytes = isVideo ? 100 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        {
          success: false,
          error: isVideo
            ? 'Video file is too large. Maximum allowed size is 100MB.'
            : 'Image file is too large. Maximum allowed size is 20MB.',
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate clean unique filename
    const fileExt = path.extname(file.name) || (isVideo ? '.mp4' : '.jpg');
    const sanitizeBaseName = path
      .basename(file.name, fileExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const filename = `${sanitizeBaseName || (isVideo ? 'video' : 'image')}-${uniqueSuffix}${fileExt}`;

    // Determine contentType
    const determinedType = file.type || (isVideo ? 'video/mp4' : 'image/jpeg');

    // 1. Primary storage: Save directly to MongoDB Atlas GridFS
    // This works everywhere (Vercel, cPanel, VPS, localhost) and has ZERO filesystem dependency
    await uploadToGridFS(filename, buffer, determinedType);

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

    const mediaUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: mediaUrl,
      isVideo,
      message: isVideo ? 'Video uploaded successfully' : 'Image uploaded successfully',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Media upload failed';
    console.error('POST /api/upload error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
