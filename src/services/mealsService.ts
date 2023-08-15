import * as mealRepo from "../repositories/mealsRepository";
import { IMealData } from "../types/mealType";

export async function createMeal(meal: IMealData) {
    return await mealRepo.createMeal(meal);
}
