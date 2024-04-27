import {setTheme} from '@ui5/webcomponents-base/dist/config/Theme.js'
import './App.css'
import Header from './components/Header/Header.tsx'
import '@ui5/webcomponents-icons/dist/AllIcons'
import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes.tsx";


function App() {
    setTheme('sap_horizon')

    return (
        <>
            <HashRouter>
                <Header/>
                <Routes/>
            </HashRouter>

        </>
    )
}

export default App
