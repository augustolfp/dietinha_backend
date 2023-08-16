import { CustomIngredientsTable } from "@prisma/client";

export type ICustomIngredientTableData = Omit<CustomIngredientsTable, "id">;
