import { Router } from "express";
import * as mealsController from "../controllers/mealsController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { mealSchema } from "../schemas/mealsSchemas";

const mealsRouter = Router();

mealsRouter.post(
    "/meal",
    tokenValidationMW,
    validateSchemaMW(mealSchema),
    mealsController.insertMeal
);

export default mealsRouter;
