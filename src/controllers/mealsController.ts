import { Request, Response } from "express";
import * as mealsService from "../services/mealsService";
import { IMealData } from "../types/mealType";

export async function insertMeal(req: Request, res: Response) {
    const meal: IMealData = req.body;

    const result = await mealsService.createMeal(meal);

    return res.status(201).send(result);
}
