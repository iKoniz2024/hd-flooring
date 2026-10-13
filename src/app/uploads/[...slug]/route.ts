import { serveUploadedImage } from '@/lib/server/serveImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  return serveUploadedImage(slug);
}
