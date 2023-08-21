import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export default function validateSchemaMW(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);

        if (validation.error) {
            throw new ApiError("Invalid or incomplete Request Body", 422);
        }

        next();
    };
}
