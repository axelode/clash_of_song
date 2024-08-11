/*
  Warnings:

  - You are about to drop the column `name` on the `diamond` table. All the data in the column will be lost.
  - You are about to drop the column `diamondCount` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "diamond" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "diamondCount",
ADD COLUMN     "diamondQty" INTEGER DEFAULT 0;
