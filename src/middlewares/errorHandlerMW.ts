import { NextFunction, Request, Response } from "express";

export default function errorHandlerMW(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    function errorMessageToStatusCode(message?: string) {
        if (message === "Credenciais inválidas") return 401;
        return 400;
    }
    return res.status(errorMessageToStatusCode(err.message)).send(err.message);
}
