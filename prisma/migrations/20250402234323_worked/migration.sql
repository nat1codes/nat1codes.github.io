/*
  Warnings:

  - You are about to drop the `Medium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `mediumId` on the `Work` table. All the data in the column will be lost.
  - Added the required column `medium` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Medium";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Work" ("description", "id", "image", "title", "year") SELECT "description", "id", "image", "title", "year" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
