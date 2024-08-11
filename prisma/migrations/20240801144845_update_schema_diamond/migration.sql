-- DropIndex
DROP INDEX "invoice_userId_key";

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "diamondId" TEXT;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_diamondId_fkey" FOREIGN KEY ("diamondId") REFERENCES "diamond"("id") ON DELETE SET NULL ON UPDATE CASCADE;
