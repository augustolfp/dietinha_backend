import { prisma } from "../config/database";

export async function search(term: string) {
    if (term.length < 3) {
        throw Error("Termo de pesquisa inválido");
    }

    return await prisma.$queryRaw`
    SELECT *
    FROM "tacoTable"
    WHERE
      description ILIKE ${"%" + term + "%"}`;
}
