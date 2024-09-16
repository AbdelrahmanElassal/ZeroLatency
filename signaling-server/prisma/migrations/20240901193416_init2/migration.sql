/*
  Warnings:

  - Added the required column `firstname` to the `streamers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `streamers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streamers" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;
