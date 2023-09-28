import { Router } from "express";
import * as mealsController from "../controllers/mealsController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { mealSchema } from "../schemas/mealsSchemas";

const mealsRouter = Router();

mealsRouter.post(
    "/meals",
    tokenValidationMW,
    validateSchemaMW(mealSchema),
    mealsController.insertMeal
);

mealsRouter.delete(
    "/meals/:mealId",
    tokenValidationMW,
    mealsController.deleteMeal
);

mealsRouter.get(
    "/meals/:dailyLogId",
    tokenValidationMW,
    mealsController.getMeals
);

export default mealsRouter;
