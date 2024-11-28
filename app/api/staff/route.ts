// app/api/categories/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, imageUrl, password, dateJoining, role, phoneNumber } =
      await request.json();
    const newStaff = {
      name,
      email,
      imageUrl,
      password,
      dateJoining,
      role,
      phoneNumber,
    };
    return NextResponse.json(newStaff, { status: 201 }); // Return status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create staff',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
