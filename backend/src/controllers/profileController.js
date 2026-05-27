const prisma = require("../lib/prisma")

exports.completeOnboarding = async (req, res) => {
    try {

        const userId = req.user.userId

        const {

            // IDENTITAS
            fullName,
            gender,
            birthDate,
            nationality,
            province,

            familyIncomeCategory,
            fromUnderrepresentedRegion,

            // AKADEMIK
            currentDegreeLevel,
            targetDegreeLevel,

            schoolName,
            highSchoolTrack,
            schoolTier,

            expectedGraduationYear,

            reportAverage,
            mathScore,
            englishScore,
            majorSubjectAverage,

            extracurricularText,

            // ACHIEVEMENT
            olympiadLevel,
            leadershipCount,
            volunteerCount,
            competitionCount,

            // CAREER
            intendedCareerTrack,
            willingReturnHome,
            needsFullFunding,

            // AI TEXT
            personalStatement,
            achievementsNarrative,
            futureGoals,

            // RELATIONAL
            hardSkills,
            softSkills,
            langSkills,
            langCerts,
            targetCountries,

        } = req.body

        // CREATE PROFILE
        const profile = await prisma.profile.upsert({

            where: {
                userId,
            },

            update: {

                fullName,
                gender,

                birthDate:
                    birthDate && birthDate !== ""
                        ? new Date(birthDate)
                        : null,

                nationality,
                province,

                familyIncomeCategory,
                fromUnderrepresentedRegion,

                currentDegreeLevel,
                targetDegreeLevel,

                schoolName,
                highSchoolTrack,
                schoolTier,

                expectedGraduationYear,

                reportAverage,
                mathScore,
                englishScore,
                majorSubjectAverage,

                extracurricularText,

                olympiadLevel,
                leadershipCount,
                volunteerCount,
                competitionCount,

                intendedCareerTrack,
                willingReturnHome,
                needsFullFunding,

                personalStatement,
                achievementsNarrative,
                futureGoals,

                isCompleted: true,
            },

            create: {

                userId,

                fullName,
                gender,

                birthDate:
                    birthDate && birthDate !== ""
                        ? new Date(birthDate)
                        : null,

                nationality,
                province,

                familyIncomeCategory,
                fromUnderrepresentedRegion,

                currentDegreeLevel,
                targetDegreeLevel,

                schoolName,
                highSchoolTrack,
                schoolTier,

                expectedGraduationYear,

                reportAverage,
                mathScore,
                englishScore,
                majorSubjectAverage,

                extracurricularText,

                olympiadLevel,
                leadershipCount,
                volunteerCount,
                competitionCount,

                intendedCareerTrack,
                willingReturnHome,
                needsFullFunding,

                personalStatement,
                achievementsNarrative,
                futureGoals,

                isCompleted: true,
            },
        })

        return res.status(201).json({
            message: "Onboarding completed",

            profile,
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Failed to complete onboarding",
        })

    }
}