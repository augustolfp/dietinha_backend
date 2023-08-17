import { prisma } from "../config/database";
import { ICountedDayData } from "../types/countedDayType";

export async function addDay(countedDay: ICountedDayData) {
    return await prisma.countedDays.create({
        data: countedDay,
    });
}

export async function getUserDays(userId: string) {
    return await prisma.countedDays.findMany({
        where: { userId: userId },
    });
}

export async function getDaysSummarizedData(userId: string) {
    return await prisma.$queryRaw`
        WITH sum_of_day AS (	SELECT
		meals."countedDayId" AS "countedDayId",
		SUM(ing.carbs) AS "sumOfCarbs",
		SUM(ing.fats) AS "sumOfFats",
		SUM(ing.proteins) AS "sumOfProteins",
		SUM(ing.kcals) AS "sumOfKcals"
	FROM
		meals
		LEFT JOIN ingredients ing ON meals.id = ing."mealId"
	GROUP BY
		meals."countedDayId")

SELECT
	cdays.id AS "countedDayId",
	cdays.day AS "day",
	cdays.notes,
	cdays."caloriesTarget",
	cdays."proteinsTarget",
	COALESCE(sd."sumOfCarbs",0) AS "sumOfCarbs",
	COALESCE(sd."sumOfFats",0) 	AS "sumOfFats",
	COALESCE(sd."sumOfProteins",0) AS "sumOfProteins",
	COALESCE(sd."sumOfKcals",0) AS "sumOfKcals"
FROM
	"countedDays" cdays
	LEFT JOIN sum_of_day sd ON cdays.id = sd."countedDayId"
WHERE
	cdays."userId" = ${userId}
    `;
}

export async function getDayBasicInfo(countedDayId: string) {
    return await prisma.countedDays.findUnique({
        where: {
            id: countedDayId,
        },
    });
}
