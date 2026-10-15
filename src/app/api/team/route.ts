import { NextResponse } from 'next/server';
import { getTeamMembersCollection, TeamMemberDoc } from '@/lib/db/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    const teamCollection = await getTeamMembersCollection();
    const filter: Record<string, unknown> = {};

    if (!includeInactive) {
      filter.isActive = { $ne: false };
    }

    const members = await teamCollection
      .find(filter)
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: members,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch team members';
    console.error('GET /api/team error:', error);
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
    const { name, role, badge, bio, photo, order = 0, isActive = true } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Member name is required' },
        { status: 400 }
      );
    }

    if (!role || typeof role !== 'string' || !role.trim()) {
      return NextResponse.json(
        { success: false, error: 'Role / Designation is required' },
        { status: 400 }
      );
    }

    if (!photo || typeof photo !== 'string' || !photo.trim()) {
      return NextResponse.json(
        { success: false, error: 'Member photo is required' },
        { status: 400 }
      );
    }

    const teamCollection = await getTeamMembersCollection();
    const now = new Date();

    const newMember: TeamMemberDoc = {
      name: name.trim(),
      role: role.trim(),
      badge: typeof badge === 'string' && badge.trim() ? badge.trim() : '',
      bio: typeof bio === 'string' ? bio.trim() : '',
      photo: photo.trim(),
      order: typeof order === 'number' ? order : 0,
      isActive: Boolean(isActive),
      createdAt: now,
      updatedAt: now,
    };

    const result = await teamCollection.insertOne(newMember);

    return NextResponse.json(
      {
        success: true,
        message: 'Team member added successfully.',
        data: {
          _id: result.insertedId,
          ...newMember,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to create team member';
    console.error('POST /api/team error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
