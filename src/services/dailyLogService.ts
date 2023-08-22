import { format } from "date-fns";
import * as dailyLogRepo from "../repositories/dailyLogsRepository";
import * as mealsService from "./mealsService";
import * as ingredientsService from "./ingredientsService";
import { IDailyLogData } from "../types/dailyLogType";
import { ApiError } from "../helpers/api-errors";

export async function addDay(dailyLog: IDailyLogData) {
    const date = new Date(dailyLog.date);

    try {
        const newDailyLog = await dailyLogRepo.addDay({
            ...dailyLog,
            date: date,
            notes: dailyLog.notes ?? "",
        });
        return {
            ...newDailyLog,
            date: format(newDailyLog.date, "yyyy-MM-dd"),
        };
    } catch (e) {
        if (e.code === "P2002") {
            throw new ApiError(
                "User already have a Daily-log in provided Date",
                403
            );
        }
        throw e;
    }
}

export async function getUserDaysSummary(userId: string) {
    const daysBasicInfo = await dailyLogRepo.getUserDays(userId);

    const getWithPromiseAll = async () => {
        let data = await Promise.all(
            daysBasicInfo.map(async (dailyLog) => {
                const nutrientsTotal =
                    await ingredientsService.getNutrientTotalByDay(dailyLog.id);
                return {
                    ...dailyLog,
                    date: format(dailyLog.date, "yyyy-MM-dd"),
                    ...nutrientsTotal,
                };
            })
        );
        return data;
    };

    return getWithPromiseAll();
}

export async function getDailyLogDetails(dailyLogId: string, userId: string) {
    const dayBasicInfo = await dailyLogRepo.getDayBasicInfo(dailyLogId);

    if (dayBasicInfo.userId !== userId) {
        throw new ApiError(
            "User does not have a daily-log with provided id",
            404
        );
    }

    const mealsList = await mealsService.getMealsDetailsByDay(dailyLogId);

    const dayNutrientTotal = await ingredientsService.getNutrientTotalByDay(
        dailyLogId
    );

    const detailedDailyLog = {
        ...dayBasicInfo,
        date: format(dayBasicInfo.date, "yyyy-MM-dd"),
        ...dayNutrientTotal,
        mealsList: [...mealsList],
    };

    return detailedDailyLog;
}
