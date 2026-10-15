import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getTeamMembersCollection } from '@/lib/db/mongodb';
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
        { success: false, error: 'Invalid team member ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, role, badge, bio, photo, isActive, order } = body;

    const teamCollection = await getTeamMembersCollection();
    const memberId = new ObjectId(id);

    const existing = await teamCollection.findOne({ _id: memberId });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    const updateDoc: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof name === 'string' && name.trim()) {
      updateDoc.name = name.trim();
    }

    if (typeof role === 'string' && role.trim()) {
      updateDoc.role = role.trim();
    }

    if (badge !== undefined) {
      updateDoc.badge = typeof badge === 'string' ? badge.trim() : '';
    }

    if (bio !== undefined) {
      updateDoc.bio = typeof bio === 'string' ? bio.trim() : '';
    }

    if (typeof photo === 'string' && photo.trim()) {
      updateDoc.photo = photo.trim();
    }

    if (typeof isActive === 'boolean') {
      updateDoc.isActive = isActive;
    }

    if (typeof order === 'number') {
      updateDoc.order = order;
    }

    await teamCollection.updateOne({ _id: memberId }, { $set: updateDoc });

    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully.',
      data: {
        ...existing,
        ...updateDoc,
        _id: id,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to update team member';
    console.error('PUT /api/team/[id] error:', error);
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
        { success: false, error: 'Invalid team member ID' },
        { status: 400 }
      );
    }

    const teamCollection = await getTeamMembersCollection();
    const memberId = new ObjectId(id);

    const existing = await teamCollection.findOne({ _id: memberId });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    await teamCollection.deleteOne({ _id: memberId });

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to delete team member';
    console.error('DELETE /api/team/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
