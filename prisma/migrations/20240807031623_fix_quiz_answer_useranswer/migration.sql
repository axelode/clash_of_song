/*
  Warnings:

  - You are about to drop the column `isTrue` on the `choices` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `choices` table. All the data in the column will be lost.
  - You are about to drop the column `option` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `answerTime` on the `user_answer` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `user_answer` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `user_answer` table. All the data in the column will be lost.
  - Added the required column `isCorrect` to the `choices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `user_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "choices" DROP COLUMN "isTrue",
DROP COLUMN "updateAt",
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "quiz" DROP COLUMN "option",
DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "user_answer" DROP COLUMN "answerTime",
DROP COLUMN "score",
DROP COLUMN "updateAt",
ADD COLUMN     "content" TEXT NOT NULL;
