import { Router } from "express";
import * as ingredientsController from "../controllers/ingredientsController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { ingredientSchema } from "../schemas/ingredientsSchemas";

const ingredientsRouter = Router();

ingredientsRouter.post(
    "/add-ingredients",
    tokenValidationMW,
    validateSchemaMW(ingredientSchema),
    ingredientsController.insertIngredient
);

export default ingredientsRouter;