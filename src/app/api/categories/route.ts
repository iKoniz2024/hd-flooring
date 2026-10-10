import { NextResponse } from 'next/server';
import { getCategoriesCollection } from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    const categoriesCollection = await getCategoriesCollection();
    const filter = includeInactive ? {} : { isActive: { $ne: false } };

    const categories = await categoriesCollection
      .find(filter)
      .sort({ name: 1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
    console.error('GET /api/categories error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, description, isActive = true } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    if (!image || typeof image !== 'string' || !image.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category cover image is required' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const categoriesCollection = await getCategoriesCollection();

    // Check for existing duplicate name manually before insertion for immediate friendly message
    const existing = await categoriesCollection.findOne({
      name: { $regex: new RegExp(`^${trimmedName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i') }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Category name already exists' },
        { status: 400 }
      );
    }

    const now = new Date();
    const result = await categoriesCollection.insertOne({
      name: trimmedName,
      description: typeof description === 'string' ? description.trim() : '',
      image: typeof image === 'string' ? image.trim() : undefined,
      isActive: Boolean(isActive),
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Category added successfully.',
        data: {
          _id: result.insertedId,
          name: trimmedName,
          image: typeof image === 'string' ? image.trim() : undefined,
          createdAt: now,
          updatedAt: now,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle MongoDB duplicate key error code 11000
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Category name already exists' },
        { status: 400 }
      );
    }

    const errMessage = error instanceof Error ? error.message : 'Failed to create category';
    console.error('POST /api/categories error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
