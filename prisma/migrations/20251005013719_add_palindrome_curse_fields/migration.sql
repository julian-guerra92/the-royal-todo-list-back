-- AlterTable
ALTER TABLE `Todo` ADD COLUMN `cursed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `delete_at` DATETIME(3) NULL;
