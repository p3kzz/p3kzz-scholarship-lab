-- CreateTable
CREATE TABLE `Recommendation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `scholarshipId` INTEGER NOT NULL,
    `rank` INTEGER NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Recommendation_userId_idx`(`userId`),
    INDEX `Recommendation_scholarshipId_idx`(`scholarshipId`),
    UNIQUE INDEX `Recommendation_userId_scholarshipId_key`(`userId`, `scholarshipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_scholarshipId_fkey` FOREIGN KEY (`scholarshipId`) REFERENCES `Scholarship`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
