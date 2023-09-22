import useUser from "../../hooks/useUser";
import InfoList from "./InfoList";

export default function DataPanel() {
    const { isLoggedIn } = useUser();

    return (
        <div className="bg-white p-4 shadow-md">
            <div className="border-b-2 border-slate-600 mb-4">
                <h2 className="text-xl font-semibold text-slate-600 mb-2">
                    PAINEL DE DADOS
                </h2>
            </div>
            {isLoggedIn ? (
                <InfoList />
            ) : (
                <div className="text-sm text-slate-600">
                    Efetue o Sign-in/Sign-up para obter credenciais
                </div>
            )}
        </div>
    );
}
