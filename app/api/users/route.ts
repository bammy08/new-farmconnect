import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: 'User already exists',
        },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    console.log(newUser);
    return NextResponse.json(
      {
        data: newUser,
        message: 'User Created Successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests to users
export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    }); // Fetch users from your database
    return NextResponse.json(users, { status: 200 }); // Return users with a 200 status
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch users',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
