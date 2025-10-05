/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Todo`;

-- CreateTable
CREATE TABLE `to_do` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` VARCHAR(500) NOT NULL,
    `scheduled_date` DATE NOT NULL,
    `priority` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cursed` BOOLEAN NOT NULL DEFAULT false,
    `delete_at` DATETIME(3) NULL,

    INDEX `idx_cursed_scheduled_priority`(`cursed`, `scheduled_date`, `priority`),
    INDEX `idx_cursed_delete_cleanup`(`cursed`, `delete_at`),
    INDEX `idx_scheduled_priority_order`(`scheduled_date`, `priority`),
    INDEX `idx_created_at`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
