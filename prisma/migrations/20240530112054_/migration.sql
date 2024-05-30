/*
  Warnings:

  - You are about to drop the `Another` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Human` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Another";

-- DropTable
DROP TABLE "Human";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Go" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Go_pkey" PRIMARY KEY ("id")
);
