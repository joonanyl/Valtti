/*
  Warnings:

  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "field",
ADD COLUMN     "profession" TEXT,
ALTER COLUMN "price" DROP NOT NULL;
