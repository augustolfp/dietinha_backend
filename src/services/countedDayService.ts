import * as countedDayRepo from "../repositories/countedDaysRepository";
import { ICountedDayData } from "../types/countedDayType";

export async function addDay(countedDay: ICountedDayData) {
    const date = new Date(countedDay.day);

    return await countedDayRepo.addDay({
        ...countedDay,
        day: date,
    });
}

export async function getUserDays(userId: string) {
    return await countedDayRepo.getUserDays(userId);
}
