import * as tacoTableRepo from "../repositories/tacoTableRepository";
import * as customIngRepo from "../repositories/customIngredientsTableRepository";
import { ApiError } from "../helpers/api-errors";

export async function search(term: string, userId: string) {
    if (term.length < 3) {
        throw new ApiError("Search term has a minimum of 3 characters", 403);
    }

    const tacoResults = await tacoTableRepo.search(term);
    const customResults = await customIngRepo.search(term, userId);

    return {
        tacoResults: tacoResults,
        customResults: customResults,
    };
}
