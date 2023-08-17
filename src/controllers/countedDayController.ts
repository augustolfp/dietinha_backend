import { Request, Response } from "express";
import * as countedDayService from "../services/countedDayService";
import { ICountedDayData } from "../types/countedDayType";

export async function addDay(req: Request, res: Response) {
    const countedDay: Omit<ICountedDayData, "userId"> = req.body;

    const result = await countedDayService.addDay({
        ...countedDay,
        userId: res.locals.userId,
    });
    return res.status(201).send(result);
}

export async function getDaysFromUser(req: Request, res: Response) {
    const userId = res.locals.userId;

    const result = await countedDayService.getUserDays(userId);
    return res.status(200).send(result);
}

export async function getDayDetailed(req: Request, res: Response) {
    const { countedDayId }: { countedDayId: string } = req.body;

    const result = await countedDayService.getCountedDayDetails(countedDayId);

    return res.status(200).send(result);
}
