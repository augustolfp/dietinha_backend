import { prisma } from "../config/database";
import { IDailyLogData } from "../types/dailyLogType";

export async function addDay(dailyLog: IDailyLogData) {
    return await prisma.dailyLogs.create({
        data: dailyLog,
    });
}

export async function getUserDays(userId: string) {
    return await prisma.dailyLogs.findMany({
        where: { userId: userId },
    });
}

export async function getDayBasicInfo(dailyLogId: string) {
    return await prisma.dailyLogs.findUnique({
        where: {
            id: dailyLogId,
        },
    });
}
