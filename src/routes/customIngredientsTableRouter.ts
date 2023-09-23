import { Router } from "express";
import * as customIngTableController from "../controllers/customIngredientsTableController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { customIngSchema } from "../schemas/customIngredientsSchemas";

const customIngredientsTableRouter = Router();

customIngredientsTableRouter.post(
    "/datatable/custom",
    tokenValidationMW,
    validateSchemaMW(customIngSchema),
    customIngTableController.insertCustomIng
);

export default customIngredientsTableRouter;
