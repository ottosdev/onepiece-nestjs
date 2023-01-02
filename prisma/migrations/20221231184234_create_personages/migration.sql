-- CreateTable
CREATE TABLE "tb_personages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hasAkuma" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_personages_name_key" ON "tb_personages"("name");
