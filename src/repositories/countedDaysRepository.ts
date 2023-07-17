import { prisma } from "../config/database";
import { ICountedDayData } from "../types/countedDayType";

export async function addDay(countedDay: ICountedDayData) {
    return await prisma.countedDays.create({
        data: countedDay,
    });
}

export async function getUserDays(userId: string) {
    return await prisma.countedDays.findFirst({
        where: { userId: userId },
    });
}
