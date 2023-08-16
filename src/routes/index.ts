import { Router } from "express";
import authRouter from "./authRouter";
import searchRouter from "./searchRouter";
import countedDayRouter from "./countedDayRouter";
import mealsRouter from "./mealsRouter";
import ingredientsRouter from "./ingredientsRouter";
import customIngsRouter from "./customIngredientsTableRouter";

const router = Router();

router.use(authRouter);
router.use(searchRouter);
router.use(countedDayRouter);
router.use(mealsRouter);
router.use(ingredientsRouter);
router.use(customIngsRouter);

export default router;
