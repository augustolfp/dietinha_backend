import * as countedDayRepo from "../repositories/countedDaysRepository";
import * as mealsService from "./mealsService";
import { ICountedDayData } from "../types/countedDayType";

export async function addDay(countedDay: ICountedDayData) {
    const date = new Date(countedDay.day);

    return await countedDayRepo.addDay({
        ...countedDay,
        day: date,
    });
}

export async function getUserDays(userId: string) {
    return await countedDayRepo.getDaysSummarizedData(userId);
}

export async function getCountedDayDetails(countedDayId: string) {
    const mealsList = await mealsService.getMealsDetailsByDay(countedDayId);
    const dayBasicInfo = await countedDayRepo.getDayBasicInfo(countedDayId);

    const detailedCountedDay = {
        ...dayBasicInfo,
        mealsList: mealsList,
    };

    return detailedCountedDay;
}
