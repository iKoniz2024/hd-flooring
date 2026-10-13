import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getFromGridFS, uploadToGridFS, getMimeTypeFromExt } from '@/lib/db/mongodb';

export async function serveUploadedImage(slugParam: string[] | string): Promise<NextResponse> {
  try {
    const rawPath = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
    const filename = decodeURIComponent(rawPath || '').replace(/^(\/|\\)?uploads(\/|\\)/, '');

    if (!filename || filename.includes('..')) {
      return new NextResponse('Invalid image path', { status: 400 });
    }

    // 1. Check MongoDB Atlas GridFS
    const gridFile = await getFromGridFS(filename);
    if (gridFile && gridFile.buffer.length > 0) {
      const body = new Uint8Array(gridFile.buffer);
      return new NextResponse(body, {
        status: 200,
        headers: {
          'Content-Type': gridFile.contentType,
          'Content-Length': body.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 2. Fallback: Check local filesystem public/uploads (e.g. locally created assets)
    try {
      const localPath = path.join(process.cwd(), 'public', 'uploads', filename);
      const localBuffer = await readFile(localPath);
      const mimeType = getMimeTypeFromExt(filename);

      // Asynchronously upload to GridFS so future requests on any platform hit MongoDB
      uploadToGridFS(filename, localBuffer, mimeType).catch((err) => {
        console.warn('Background GridFS upload error:', err);
      });

      const body = new Uint8Array(localBuffer);
      return new NextResponse(body, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Length': body.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      // Not on local filesystem either
    }

    return new NextResponse('Image not found', { status: 404 });
  } catch (error) {
    console.error('serveUploadedImage error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
