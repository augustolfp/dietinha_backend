import { Router } from "express";
import * as ingredientsController from "../controllers/ingredientsController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { ingredientSchema } from "../schemas/ingredientsSchemas";

const ingredientsRouter = Router();

ingredientsRouter.get(
    "/ingredients/:mealId",
    tokenValidationMW,
    ingredientsController.getIngredients
);

ingredientsRouter.post(
    "/ingredients",
    tokenValidationMW,
    validateSchemaMW(ingredientSchema),
    ingredientsController.insertIngredient
);

ingredientsRouter.delete(
    "/ingredients/:ingredientId",
    tokenValidationMW,
    ingredientsController.deleteIngredient
);

export default ingredientsRouter;
