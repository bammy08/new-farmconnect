// app/api/discount/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, code, expiryDate } = await request.json();
    const newDiscount = { title, code, expiryDate }; // Create a new discount object
    return NextResponse.json(newDiscount, { status: 201 }); // Return status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create discount',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
