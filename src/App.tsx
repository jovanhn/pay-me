import {setTheme} from '@ui5/webcomponents-base/dist/config/Theme.js'
import './App.css'
import Header from './components/Header/Header.tsx'
import '@ui5/webcomponents-icons/dist/AllIcons'
import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes.tsx";
import {useState} from "react";
import { TokenResponse, useGoogleLogin} from "@react-oauth/google";
import {Button} from "@ui5/webcomponents-react";


function App() {
    setTheme('sap_horizon')

    const [user, setUser] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri">>();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse)
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });


    return (
        <>
            {user ? (
                <HashRouter>
                    <Header user={user} setUser={setUser}/>
                    <Routes/>
                </HashRouter>
            ) : (
                <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
            )}


        </>
    )
}

export default App
