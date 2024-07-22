-- CreateTable
CREATE TABLE "Product2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product2_pkey" PRIMARY KEY ("id")
);
