import { Request, Response } from "express";

export async function healthCheck(req: Request, res: Response) {
    return res.sendStatus(200);
}
