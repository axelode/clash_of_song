/*
  Warnings:

  - You are about to drop the column `diamond` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "diamond",
DROP COLUMN "isPremium";

-- CreateTable
CREATE TABLE "diamond" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "diamond_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diamond" ADD CONSTRAINT "diamond_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
