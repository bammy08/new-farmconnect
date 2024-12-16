// API Route: /api/users/[id]
import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const token = req.nextUrl.searchParams.get('token');

  try {
    // Validate the token
    const user = await db.user.findUnique({ where: { id } });

    if (!user || user.verificationToken !== token) {
      return NextResponse.json(
        { message: 'Invalid or expired token.' },
        { status: 400 }
      );
    }

    // Optionally, clear the token after verification
    await db.user.update({
      where: { id },
      data: { verificationToken: null },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user.' },
      { status: 500 }
    );
  }
}
