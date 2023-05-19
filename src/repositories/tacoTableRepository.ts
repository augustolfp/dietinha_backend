export async function search(term: string) {
    if (term.length < 3) {
        throw Error("Termo de pesquisa inválido");
    }

    return {
        result: `Search term: ${term}`,
    };
}
