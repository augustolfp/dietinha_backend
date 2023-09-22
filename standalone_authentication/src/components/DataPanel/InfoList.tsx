import useUser from "../../hooks/useUser";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

export default function InfoList() {
    const { accessToken, user } = useUser();
    const [copyToken, copyTokenResult] = useCopyToClipboard();

    const handleClickCopyToken = () => {
        copyToken(accessToken);
    };

    return (
        <ul>
            <li>
                <h3 className="text-slate-600 font-semibold">USER NAME:</h3>
                <p className="bg-slate-200 p-3 my-2 text-sm font-medium">
                    {user?.displayName ? user.displayName : "Não-definido"}
                </p>
            </li>
            <li>
                <h3 className="text-slate-600 font-semibold">ACCESS TOKEN:</h3>
                <div className="flex">
                    <p className="break-all bg-slate-200 p-3 my-2 text-sm font-medium">
                        {accessToken}
                    </p>
                    <div>
                        <button
                            className="px-4 py-2 m-2  bg-slate-600 h-fit text-white font-bold rounded-sm hover:bg-slate-500"
                            onClick={handleClickCopyToken}
                        >
                            Copy
                        </button>
                        <div className="break-all m-2 text-xs text-slate-500 text-center">
                            {copyTokenResult?.state === "success" && "Copiado!"}
                            {copyTokenResult?.state === "error" &&
                                "Ocorreu um erro. Copie manualmente!"}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
}
