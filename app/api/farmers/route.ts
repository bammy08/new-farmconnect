import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      shop,
      profileImageUrl,
      location,
      city,
      phone,
      userId,
    } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required to create a farmer profile.' },
        { status: 400 }
      );
    }

    const newFarmer = await db.farmerProfile.create({
      data: {
        name,
        email,
        shop,
        profileImageUrl,
        location,
        city,
        phone,
        user: {
          connect: {
            id: userId, // Connect the farmer profile to an existing user
          },
        },
      },
    });

    // Update emailVerified field for the associated user
    await db.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    return NextResponse.json(newFarmer, { status: 201 }); // Return status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create farmer',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests to farmers profile
export async function GET(request: NextRequest) {
  try {
    const profile = await db.farmerProfile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    }); // Fetch profile from your database
    return NextResponse.json(profile, { status: 200 }); // Return profile with a 200 status
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch profile',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
