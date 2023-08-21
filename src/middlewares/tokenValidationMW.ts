import { NextFunction, Request, Response } from "express";
import auth from "../firebase/firebaseConfig";
import { ApiError } from "../helpers/api-errors";

export default async function tokenValidationMW(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError("Missing or Invalid Credentials", 401);
    }

    try {
        const decodeValue = await auth.verifyIdToken(token);
        res.locals.userId = decodeValue.uid;
        return next();
    } catch (err) {
        throw new ApiError("Missing or Invalid Credentials", 401);
    }
}
