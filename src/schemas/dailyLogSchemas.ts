import coreJoi from "joi";
import joiDate from "@joi/date";
import { IDailyLogData } from "../types/dailyLogType";

const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const dailyLogSchema = Joi.object<Omit<IDailyLogData, "userId">>({
    date: Joi.date().format("YYYY-MM-DD"),
    notes: Joi.string().allow("").optional(),
    caloriesTarget: Joi.number().integer().min(0),
    proteinsTarget: Joi.number().integer().min(0),
});
