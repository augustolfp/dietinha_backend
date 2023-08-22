import { Router } from "express";
import * as ingredientsController from "../controllers/ingredientsController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { ingredientSchema } from "../schemas/ingredientsSchemas";

const ingredientsRouter = Router();

ingredientsRouter.post(
    "/ingredient",
    tokenValidationMW,
    validateSchemaMW(ingredientSchema),
    ingredientsController.insertIngredient
);

ingredientsRouter.delete(
    "/ingredient/:ingredientId",
    tokenValidationMW,
    ingredientsController.deleteIngredient
);

export default ingredientsRouter;
