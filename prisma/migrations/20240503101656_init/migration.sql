-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "actress" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "remark" TEXT,
    "yanzhi" INTEGER NOT NULL DEFAULT 0,
    "shengao" INTEGER NOT NULL DEFAULT 0,
    "tixing" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Actress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Actress_name_key" ON "Actress"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
