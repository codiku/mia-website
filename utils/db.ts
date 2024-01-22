import { PrismaClient } from "@prisma/client";

export const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;

export function excludeField<
  Table extends { [k: string]: unknown },
  Key extends keyof Table
>(table: Table, keys: Key[]): Omit<Table, Key> {
  return Object.fromEntries(
    Object.entries(table).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<Table, Key>;
}
