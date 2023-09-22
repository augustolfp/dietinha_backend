import SignInPanel from "./components/SignInPanel";
import DataPanel from "./components/DataPanel";

function App() {
    return (
        <div className="bg-slate-50 h-screen p-8">
            <h1 className="font-bold text-slate-600 text-xl mb-8">
                Dietinha Standalone Authentication app
            </h1>
            <SignInPanel />
            <DataPanel />
        </div>
    );
}

export default App;
