import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests to fetch a user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Extract `id` from the path parameter

    if (!id) {
      return NextResponse.json(
        { message: 'ID is required to fetch the user' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch user',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
