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
                    ...nutrientsTotal,
                };
            })
        );
        return data;
    };

    return getWithPromiseAll();
}

export async function getDailyLogDetails(dailyLogId: string) {
    const mealsList = await mealsService.getMealsDetailsByDay(dailyLogId);
    const dayBasicInfo = await dailyLogRepo.getDayBasicInfo(dailyLogId);
    const dayNutrientTotal = await ingredientsService.getNutrientTotalByDay(
        dailyLogId
    );

    const detailedDailyLog = {
        ...dayBasicInfo,
        ...dayNutrientTotal,
        mealsList: mealsList,
    };

    return detailedDailyLog;
}
