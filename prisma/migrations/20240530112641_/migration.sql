/*
  Warnings:

  - You are about to drop the `Go` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Go";

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);
