-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `fullName` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `birthDate` DATETIME(3) NULL,
    `nationality` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `currentDegreeLevel` VARCHAR(191) NULL,
    `targetDegreeLevel` VARCHAR(191) NULL,
    `schoolName` VARCHAR(191) NULL,
    `highSchoolTrack` VARCHAR(191) NULL,
    `reportAverage` DOUBLE NULL,
    `mathScore` DOUBLE NULL,
    `englishScore` DOUBLE NULL,
    `majorSubjectAverage` DOUBLE NULL,
    `expectedGraduationYear` INTEGER NULL,
    `olympiadLevel` VARCHAR(191) NULL,
    `leadershipCount` INTEGER NULL,
    `volunteerCount` INTEGER NULL,
    `competitionCount` INTEGER NULL,
    `extracurricularText` TEXT NULL,
    `familyIncomeCategory` VARCHAR(191) NULL,
    `schoolTier` VARCHAR(191) NULL,
    `intendedCareerTrack` VARCHAR(191) NULL,
    `willingReturnHome` BOOLEAN NULL,
    `personalStatement` TEXT NULL,
    `achievementsNarrative` TEXT NULL,
    `futureGoals` TEXT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('HARD', 'SOFT', 'LANGUAGE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
