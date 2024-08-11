/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `diamond` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "diamond_userId_key" ON "diamond"("userId");
