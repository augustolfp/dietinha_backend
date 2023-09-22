import { useState } from "react";

export default function useCopyToClipboard() {
    const [result, setResult] = useState<
        null | { state: "success" } | { state: "error"; message: string }
    >(null);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setResult({ state: "success" });
        } catch (e) {
            setResult({
                state: "error",
                message:
                    "Ocorreu um erro. Copie o texto manualmente, ou tente novamente.",
            });
            throw e;
        } finally {
            // 👇 Show the result feedback for 2 seconds
            setTimeout(() => {
                setResult(null);
            }, 2000);
        }
    };

    // 👇 We want the result as a tuple
    return [copy, result] as const;
}
