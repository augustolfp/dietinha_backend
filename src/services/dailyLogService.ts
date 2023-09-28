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

    const formattedDaysSummary = daysBasicInfo.map((dailyLog) => {
        return {
            id: dailyLog.id,
            date: format(dailyLog.date, "yyyy-MM-dd"),
        };
    });
    return formattedDaysSummary;
}

export async function getDailyLogStats(dailyLogId: string, userId: string) {
    const dayBasicInfo = await dailyLogRepo.getDayBasicInfo(dailyLogId);

    if (dayBasicInfo.userId !== userId) {
        throw new ApiError(
            "User does not have a daily-log with provided id",
            404
        );
    }

    const { date, ...rest } = dayBasicInfo;

    const nutrientsTotal = await ingredientsService.getNutrientTotalByDay(
        dailyLogId
    );

    return { ...nutrientsTotal, ...rest };
}

export async function deleteDay(dailyLogId: string, userId: string) {
    const dailyLog = await dailyLogRepo.getDayBasicInfo(dailyLogId);
    const dailyLogOwnerId = dailyLog.userId;

    if (dailyLogOwnerId !== userId) {
        throw new ApiError(
            "User does not have a daily-log with provided id",
            404
        );
    }

    return await dailyLogRepo.deleteDay(dailyLogId);
}
