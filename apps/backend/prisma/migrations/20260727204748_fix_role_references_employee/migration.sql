/*
  Warnings:

  - You are about to drop the column `firstName` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "employeeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_employeeId_key" ON "Role"("employeeId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
