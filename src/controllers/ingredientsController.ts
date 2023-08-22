import { Request, Response } from "express";
import * as ingredientsService from "../services/ingredientsService";
import { IIngredientData } from "../types/ingredientType";

export async function insertIngredient(req: Request, res: Response) {
    const ingredient: IIngredientData = req.body;
    const userId = res.locals.userId;

    const result = await ingredientsService.createIngredient(
        ingredient,
        userId
    );

    return res.status(201).send(result);
}

export async function deleteIngredient(req: Request, res: Response) {
    const ingredientId: string = req.params.ingredientId;
    const userId = res.locals.userId;

    await ingredientsService.deleteIngredient(ingredientId, userId);

    return res.status(200).send("Successful operation");
}
