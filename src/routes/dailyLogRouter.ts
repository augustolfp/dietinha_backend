import { Router } from "express";
import * as dailyLogController from "../controllers/dailyLogController";
import tokenValidationMW from "../middlewares/tokenValidationMW";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { dailyLogSchema } from "../schemas/dailyLogSchemas";

const dailyLogRouter = Router();

dailyLogRouter.post(
    "/daily-log",
    tokenValidationMW,
    validateSchemaMW(dailyLogSchema),
    dailyLogController.addDay
);

dailyLogRouter.get(
    "/daily-log",
    tokenValidationMW,
    dailyLogController.getDaysFromUser
);

dailyLogRouter.get(
    "/daily-log/details/:dailyLogId",
    tokenValidationMW,
    dailyLogController.getDailyLogStats
);

dailyLogRouter.get(
    "/daily-log/:dailyLogId",
    tokenValidationMW,
    dailyLogController.getDayDetailed
);

dailyLogRouter.delete(
    "/daily-log/:dailyLogId",
    tokenValidationMW,
    dailyLogController.deleteDailyLog
);

export default dailyLogRouter;
