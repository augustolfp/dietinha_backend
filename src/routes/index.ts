import { Router } from "express";
import authRouter from "./authRouter";
import searchRouter from "./searchRouter";
import countedDayRouter from "./countedDayRouter";
import ingredientsRouter from "./ingredientsRouter";

const router = Router();

router.use(authRouter);
router.use(searchRouter);
router.use(countedDayRouter);
router.use(ingredientsRouter);

export default router;
