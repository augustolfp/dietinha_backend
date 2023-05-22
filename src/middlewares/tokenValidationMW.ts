import { NextFunction, Request, Response } from "express";
import auth from "../firebase/firebaseConfig";

export default async function tokenValidationMW(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        throw Error("Token inválido ou não enviado.");
    }

    try {
        const decodeValue = await auth.verifyIdToken(token);
        console.log(decodeValue);
        return next();
    } catch (err) {
        throw Error("Token inválido ou não enviado.");
    }
}
