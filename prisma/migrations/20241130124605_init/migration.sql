-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'instruktur', 'mahasiswa');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('aktif', 'nonaktif', 'lulus');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL,
    "instruktur_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nama" VARCHAR(100) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prodi" (
    "id" SERIAL NOT NULL,
    "prodi" VARCHAR(50) NOT NULL,
    "profile_id" UUID NOT NULL,
    "fakultas_id" INTEGER NOT NULL,

    CONSTRAINT "prodi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fakultas" (
    "id" SERIAL NOT NULL,
    "fakultas" VARCHAR(50) NOT NULL,
    "prodi_id" INTEGER NOT NULL,

    CONSTRAINT "fakultas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "prodi_profile_id_key" ON "prodi"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "fakultas_prodi_id_key" ON "fakultas"("prodi_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_instruktur_id_fkey" FOREIGN KEY ("instruktur_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prodi" ADD CONSTRAINT "prodi_fakultas_id_fkey" FOREIGN KEY ("fakultas_id") REFERENCES "fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prodi" ADD CONSTRAINT "prodi_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
