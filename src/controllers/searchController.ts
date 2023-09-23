import { Request, Response } from "express";
import * as tacoTableService from "../services/tacoTableService";

export async function search(req: Request, res: Response) {
    const userId = res.locals.userId;
    const term: string = req.params.term;

    const tacoResults = await tacoTableService.search(term, userId);

    return res.status(200).send(tacoResults);
}
