import { NextResponse } from 'next/server';
import { getPartnersCollection, PartnerDoc } from '@/lib/db/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';
    const typeFilter = searchParams.get('type');

    const partnersCollection = await getPartnersCollection();
    const filter: Record<string, unknown> = {};

    if (!includeInactive) {
      filter.isActive = { $ne: false };
    }

    if (typeFilter && ['manufacturer', 'membership', 'certification'].includes(typeFilter)) {
      filter.type = typeFilter;
    }

    const partners = await partnersCollection
      .find(filter)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: partners,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch partners';
    console.error('GET /api/partners error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = verifyAuth(request);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, type, logo, websiteUrl, isActive = true, order = 0 } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Partner or brand name is required' },
        { status: 400 }
      );
    }

    const validTypes = ['manufacturer', 'membership', 'certification'];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Valid type is required (manufacturer, membership, or certification)' },
        { status: 400 }
      );
    }

    if (!logo || typeof logo !== 'string' || !logo.trim()) {
      return NextResponse.json(
        { success: false, error: 'Logo image is required' },
        { status: 400 }
      );
    }

    const partnersCollection = await getPartnersCollection();
    const now = new Date();

    const newPartner: PartnerDoc = {
      name: name.trim(),
      type: type as 'manufacturer' | 'membership' | 'certification',
      logo: logo.trim(),
      websiteUrl: typeof websiteUrl === 'string' && websiteUrl.trim() ? websiteUrl.trim() : undefined,
      isActive: Boolean(isActive),
      order: typeof order === 'number' ? order : Number(order) || 0,
      createdAt: now,
      updatedAt: now,
    };

    const result = await partnersCollection.insertOne(newPartner);

    return NextResponse.json(
      {
        success: true,
        message: 'Partner / brand added successfully.',
        data: {
          ...newPartner,
          _id: result.insertedId,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to create partner';
    console.error('POST /api/partners error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
