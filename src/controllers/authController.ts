import { Request, Response } from "express";

export async function checkAPI(req: Request, res: Response) {
    return res.status(200).send("API is working!");
}
