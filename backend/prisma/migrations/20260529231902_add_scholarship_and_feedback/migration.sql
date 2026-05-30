-- CreateTable
CREATE TABLE `Scholarship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scholarshipId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `eligibleNationalities` JSON NULL,
    `eligibleDegreeLevels` JSON NULL,
    `eligibleHighSchoolTracks` JSON NULL,
    `eligibleFields` JSON NULL,
    `preferredSchoolTier` VARCHAR(191) NULL,
    `minAge` INTEGER NULL,
    `maxAge` INTEGER NULL,
    `minReportCardAverage` DOUBLE NULL,
    `minMajorSubjectAverage` DOUBLE NULL,
    `languageRequirements` JSON NULL,
    `requiresFinancialNeed` BOOLEAN NOT NULL DEFAULT false,
    `maxFamilyIncomeCategory` VARCHAR(191) NULL,
    `hostCountry` VARCHAR(191) NULL,
    `hostRegion` VARCHAR(191) NULL,
    `selectionCriteria` JSON NULL,
    `careerTrackPreference` VARCHAR(191) NULL,
    `requiresReturnHomeCountry` BOOLEAN NOT NULL DEFAULT false,
    `missionStatement` TEXT NULL,
    `targetRecipientProfile` TEXT NULL,
    `fundingCoversTuition` BOOLEAN NOT NULL DEFAULT false,
    `fundingCoversLiving` BOOLEAN NOT NULL DEFAULT false,
    `fundingCoversAirfare` BOOLEAN NOT NULL DEFAULT false,
    `fundingCoversInsurance` BOOLEAN NOT NULL DEFAULT false,
    `fundingMonthlyStipend` DOUBLE NULL,
    `fundingIsFullFunding` BOOLEAN NOT NULL DEFAULT false,
    `fundingCoverageCount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Scholarship_scholarshipId_key`(`scholarshipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `scholarshipId` INTEGER NOT NULL,
    `feedbackType` ENUM('click', 'apply', 'accepted') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Feedback_userId_idx`(`userId`),
    INDEX `Feedback_scholarshipId_idx`(`scholarshipId`),
    UNIQUE INDEX `Feedback_userId_scholarshipId_feedbackType_key`(`userId`, `scholarshipId`, `feedbackType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_scholarshipId_fkey` FOREIGN KEY (`scholarshipId`) REFERENCES `Scholarship`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
