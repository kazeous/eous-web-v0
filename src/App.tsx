import "./components/App.css"
import {AppRouter} from "./AppRouter.tsx";
import {HashRouter} from "react-router";
import {SiteShell} from "./components/layout/SiteShell.tsx";

function App() {
    ui("theme", "#5793d1")

    return (
        <HashRouter>
            <SiteShell>
                <AppRouter/>
            </SiteShell>
        </HashRouter>
    )
}

export default App
