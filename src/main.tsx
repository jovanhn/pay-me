import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@ui5/webcomponents-react";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="384493949269-92lovmp75fdp9cs4idnmpan7884cal14.apps.googleusercontent.com">
        <React.StrictMode>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>,
)
