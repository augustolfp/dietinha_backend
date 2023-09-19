import { Router } from "express";
import searchRouter from "./searchRouter";
import dailyLogRouter from "./dailyLogRouter";
import mealsRouter from "./mealsRouter";
import ingredientsRouter from "./ingredientsRouter";
import customIngsRouter from "./customIngredientsTableRouter";
import healthRouter from "./healthRouter";

const router = Router();

router.use(searchRouter);
router.use(dailyLogRouter);
router.use(mealsRouter);
router.use(ingredientsRouter);
router.use(customIngsRouter);
router.use(healthRouter);

export default router;
