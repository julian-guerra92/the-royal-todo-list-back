-- CreateIndex
CREATE INDEX `idx_cursed_scheduled_priority` ON `Todo`(`cursed`, `scheduled_date`, `priority`);

-- CreateIndex
CREATE INDEX `idx_cursed_delete_cleanup` ON `Todo`(`cursed`, `delete_at`);

-- CreateIndex
CREATE INDEX `idx_scheduled_priority_order` ON `Todo`(`scheduled_date`, `priority`);

-- CreateIndex
CREATE INDEX `idx_created_at` ON `Todo`(`created_at`);
