-- CreateTable
CREATE TABLE "Medium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "mediumId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Work_mediumId_fkey" FOREIGN KEY ("mediumId") REFERENCES "Medium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
