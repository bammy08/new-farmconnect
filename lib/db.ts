// lib/prisma.ts (or wherever your Prisma client code is located)
import { PrismaClient } from '@prisma/client';

const db: PrismaClient = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export default db;
