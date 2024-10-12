-- CreateTable
CREATE TABLE "streams" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "streamerId" TEXT NOT NULL,

    CONSTRAINT "streams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "streams" ADD CONSTRAINT "streams_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "streamers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
