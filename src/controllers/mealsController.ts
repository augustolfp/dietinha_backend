import { Request, Response } from "express";
import * as mealsService from "../services/mealsService";
import { IMealData } from "../types/mealType";

export async function insertMeal(req: Request, res: Response) {
    const meal: IMealData = req.body;
    const userId = res.locals.userId;

    const result = await mealsService.createMeal(meal, userId);

    return res.status(201).send(result);
}
