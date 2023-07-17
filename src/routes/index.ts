import { Router } from "express";
import authRouter from "./authRouter";
import searchRouter from "./searchRouter";
import countedDayRouter from "./countedDayRouter";

const router = Router();

router.use(authRouter);
router.use(searchRouter);
router.use(countedDayRouter);

export default router;
