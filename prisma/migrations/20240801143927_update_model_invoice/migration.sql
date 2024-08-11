/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoice_userId_key" ON "invoice"("userId");
