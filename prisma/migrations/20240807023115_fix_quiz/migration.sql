/*
  Warnings:

  - You are about to drop the column `content` on the `quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "quiz" DROP COLUMN "content",
ADD COLUMN     "option" TEXT[];
