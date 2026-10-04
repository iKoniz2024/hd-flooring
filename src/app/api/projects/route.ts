import { NextResponse } from 'next/server';
import { getProjectGalleryCollection } from '@/lib/db/mongodb';

export async function GET() {
  try {
    const projectsCollection = await getProjectGalleryCollection();
    const projects = await projectsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch project gallery items';
    console.error('GET /api/projects error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      propertyType,
      location,
      coverImage,
      galleryImages,
      challenge,
      solution,
      result,
    } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Project title is required' },
        { status: 400 }
      );
    }

    if (!location || typeof location !== 'string' || !location.trim()) {
      return NextResponse.json(
        { success: false, error: 'Project location is required' },
        { status: 400 }
      );
    }

    if (!coverImage || typeof coverImage !== 'string' || !coverImage.trim()) {
      return NextResponse.json(
        { success: false, error: 'Cover image URL/file is required' },
        { status: 400 }
      );
    }

    const trimmedTitle = title.trim();
    const slug = trimmedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date();

    const projectsCollection = await getProjectGalleryCollection();
    const insertDoc = {
      title: trimmedTitle,
      slug: slug,
      category: category ? String(category).trim() : 'Flooring Project',
      propertyType: propertyType === 'Commercial' ? ('Commercial' as const) : ('Residential' as const),
      location: location.trim(),
      coverImage: coverImage.trim(),
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [coverImage.trim()],
      challenge: challenge ? String(challenge).trim() : '',
      solution: solution ? String(solution).trim() : '',
      result: result ? String(result).trim() : '',
      createdAt: now,
      updatedAt: now,
    };

    const res = await projectsCollection.insertOne(insertDoc);

    return NextResponse.json(
      {
        success: true,
        message: 'Project gallery item added successfully.',
        data: {
          _id: res.insertedId,
          ...insertDoc,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to create project gallery item';
    console.error('POST /api/projects error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
