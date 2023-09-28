import { Request, Response } from "express";
import * as dailyLogService from "../services/dailyLogService";
import { IDailyLogData } from "../types/dailyLogType";

export async function addDay(req: Request, res: Response) {
    const dailyLog: Omit<IDailyLogData, "userId"> = req.body;

    const result = await dailyLogService.addDay({
        ...dailyLog,
        userId: res.locals.userId,
    });
    return res.status(201).send(result);
}

export async function getDaysFromUser(req: Request, res: Response) {
    const userId = res.locals.userId;

    const result = await dailyLogService.getUserDaysSummary(userId);
    return res.status(200).send(result);
}

export async function getDailyLogStats(req: Request, res: Response) {
    const dailyLogId: string = req.params.dailyLogId;

    const result = await dailyLogService.getDailyLogStats(dailyLogId);
    return res.status(200).send(result);
}

export async function getDayDetailed(req: Request, res: Response) {
    const dailyLogId: string = req.params.dailyLogId;
    const userId = res.locals.userId;

    const result = await dailyLogService.getDailyLogDetails(dailyLogId, userId);

    return res.status(200).send(result);
}

export async function deleteDailyLog(req: Request, res: Response) {
    const dailyLogId: string = req.params.dailyLogId;
    const userId = res.locals.userId;

    await dailyLogService.deleteDay(dailyLogId, userId);

    return res.status(200).send("Successful operation");
}
