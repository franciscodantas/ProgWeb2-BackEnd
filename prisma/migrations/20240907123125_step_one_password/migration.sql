/*
  Warnings:

  - You are about to drop the column `password` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "password";
