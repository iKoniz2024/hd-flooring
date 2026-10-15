import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getFromGridFS, uploadToGridFS, getMimeTypeFromExt } from '@/lib/db/mongodb';

function createMediaResponse(
  buffer: Buffer,
  contentType: string,
  rangeHeader: string | null
): NextResponse {
  const totalSize = buffer.length;

  if (rangeHeader && rangeHeader.startsWith('bytes=')) {
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

    if (!isNaN(start) && start >= 0 && start < totalSize) {
      const safeEnd = isNaN(end) || end >= totalSize ? totalSize - 1 : Math.max(start, end);
      const chunkSize = safeEnd - start + 1;
      const chunk = buffer.subarray(start, safeEnd + 1);

      return new NextResponse(new Uint8Array(chunk), {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${safeEnd}/${totalSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  // Standard 200 response with Accept-Ranges so players know seeking is supported
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Accept-Ranges': 'bytes',
      'Content-Type': contentType,
      'Content-Length': totalSize.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

export async function serveUploadedImage(
  slugParam: string[] | string,
  request?: Request
): Promise<NextResponse> {
  try {
    const rawPath = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
    const filename = decodeURIComponent(rawPath || '').replace(/^(\/|\\)?uploads(\/|\\)/, '');

    if (!filename || filename.includes('..')) {
      return new NextResponse('Invalid media path', { status: 400 });
    }

    const rangeHeader = request?.headers.get('range') || null;

    // 1. Check MongoDB Atlas GridFS
    const gridFile = await getFromGridFS(filename);
    if (gridFile && gridFile.buffer.length > 0) {
      return createMediaResponse(gridFile.buffer, gridFile.contentType, rangeHeader);
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

      return createMediaResponse(localBuffer, mimeType, rangeHeader);
    } catch {
      // Not on local filesystem either
    }

    return new NextResponse('Media not found', { status: 404 });
  } catch (error) {
    console.error('serveUploadedImage error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
