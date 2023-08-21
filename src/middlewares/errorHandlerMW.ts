import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export default function errorHandlerMW(
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = err.statusCode ?? 500;
    const message = err.statusCode ? err.message : "Internal Server Error";
    return res.status(statusCode).json({ message });
}
