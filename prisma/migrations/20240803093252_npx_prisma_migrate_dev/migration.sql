/*
  Warnings:

  - Added the required column `qty` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "qty" INTEGER NOT NULL;
