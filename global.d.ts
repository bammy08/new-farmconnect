// types/global.d.ts
import { PrismaClient } from '@prisma/client';

// global.d.ts

export declare global {
  declare namespace globalThis {
    var prisma: PrismaClient;
  }
}
