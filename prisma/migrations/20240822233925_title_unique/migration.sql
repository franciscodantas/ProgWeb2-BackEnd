/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Professor_id_seq";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Student_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Question_title_key" ON "Question"("title");
