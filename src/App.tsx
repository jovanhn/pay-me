import {setTheme} from '@ui5/webcomponents-base/dist/config/Theme.js'
import './App.css'
import Header from './components/Header/Header.tsx'
import '@ui5/webcomponents-icons/dist/AllIcons'
import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes.tsx";
import AuthProvider from './auth/AuthProvider.tsx';

function App() {
    setTheme('sap_horizon')

    return (
        <>
            <AuthProvider>
                <HashRouter>
                    <Header/>
                    <Routes/>
                </HashRouter>
            </AuthProvider>
        </>
    )
}

export default App
