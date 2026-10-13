import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getPartnersCollection } from '@/lib/db/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = verifyAuth(request);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid partner ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, type, logo, websiteUrl, isActive, order } = body;

    const partnersCollection = await getPartnersCollection();
    const partnerId = new ObjectId(id);

    const existing = await partnersCollection.findOne({ _id: partnerId });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Partner not found' },
        { status: 404 }
      );
    }

    const updateDoc: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof name === 'string' && name.trim()) {
      updateDoc.name = name.trim();
    }

    const validTypes = ['manufacturer', 'membership', 'certification'];
    if (typeof type === 'string' && validTypes.includes(type)) {
      updateDoc.type = type;
    }

    if (typeof logo === 'string' && logo.trim()) {
      updateDoc.logo = logo.trim();
    }

    if (websiteUrl !== undefined) {
      updateDoc.websiteUrl = typeof websiteUrl === 'string' && websiteUrl.trim() ? websiteUrl.trim() : undefined;
    }

    if (typeof isActive === 'boolean') {
      updateDoc.isActive = isActive;
    }

    if (order !== undefined) {
      updateDoc.order = Number(order) || 0;
    }

    await partnersCollection.updateOne(
      { _id: partnerId },
      { $set: updateDoc }
    );

    const updated = await partnersCollection.findOne({ _id: partnerId });

    return NextResponse.json({
      success: true,
      message: 'Partner / brand updated successfully.',
      data: updated,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to update partner';
    console.error('PUT /api/partners/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = verifyAuth(request);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid partner ID' },
        { status: 400 }
      );
    }

    const partnerId = new ObjectId(id);
    const partnersCollection = await getPartnersCollection();

    const result = await partnersCollection.deleteOne({ _id: partnerId });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Partner / brand deleted successfully.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to delete partner';
    console.error('DELETE /api/partners/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
