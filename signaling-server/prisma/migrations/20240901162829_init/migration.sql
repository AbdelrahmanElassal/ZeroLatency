-- CreateTable
CREATE TABLE "streamers" (
    "email" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "streamers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "streamers_email_key" ON "streamers"("email");
