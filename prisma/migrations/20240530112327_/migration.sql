-- CreateTable
CREATE TABLE "Human" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Human_pkey" PRIMARY KEY ("id")
);
