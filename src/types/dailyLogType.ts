import { DailyLogs } from "@prisma/client";

export type IDailyLogData = Omit<DailyLogs, "id">;
