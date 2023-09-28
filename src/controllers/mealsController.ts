import { Request, Response } from "express";
import * as mealsService from "../services/mealsService";
import { IMealData } from "../types/mealType";

export async function insertMeal(req: Request, res: Response) {
    const meal: IMealData = req.body;
    const userId = res.locals.userId;

    const result = await mealsService.createMeal(meal, userId);

    return res.status(201).send(result);
}

export async function getMeals(req: Request, res: Response) {
    const dailyLogId: string = req.params.dailyLogId;

    const result = await mealsService.getMealsByDay(dailyLogId);

    return res.status(200).send(result);
}

export async function deleteMeal(req: Request, res: Response) {
    const mealId: string = req.params.mealId;
    const userId: string = res.locals.userId;

    await mealsService.deleteMeal(mealId, userId);

    return res.status(200).send("Successful operation");
}
