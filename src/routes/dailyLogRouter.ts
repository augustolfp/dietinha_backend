import { Router } from "express";
import * as dailyLogController from "../controllers/dailyLogController";
import tokenValidationMW from "../middlewares/tokenValidationMW";

const dailyLogRouter = Router();

dailyLogRouter.post("/daily-log", tokenValidationMW, dailyLogController.addDay);

dailyLogRouter.get(
    "/daily-log",
    tokenValidationMW,
    dailyLogController.getDaysFromUser
);

dailyLogRouter.get(
    "/daily-log/:dailyLogId",
    tokenValidationMW,
    dailyLogController.getDayDetailed
);

export default dailyLogRouter;
