import {
    browserSessionPersistence,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    User
} from "firebase/auth";
import React, {createContext, ReactElement, useEffect, useState} from "react";
import { Button, FlexBox, IllustratedMessage, Loader, Title} from "@ui5/webcomponents-react";
import {auth} from "../firebase.tsx";
import "@ui5/webcomponents-fiori/dist/illustrations/tnt/Calculator"
import styles from "./AuthProvider.module.scss"
import axios from "axios";


interface Props {
    children: ReactElement
}

interface UserContext {
    user: User,
    setUser: (user: User) => void
}

const backendEndpoint = "https://invoice-processor.onrender.com"


const AuthContext = createContext({} as UserContext)

const AuthProvider = ({children}: Props): ReactElement => {
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [loading, setLoading] = useState<boolean>(true);
    // Avoid login in case of page refresh
    auth.onAuthStateChanged(function (currentUser) {
        if (currentUser) {
            // User is signed in.
            setUser(currentUser);
        }
        setLoading(false)
    })

    auth.beforeAuthStateChanged(function () {
        setLoading(true);
    })

    // TODO: Remove this after deploying BE on server where it does not shut down after idle time
    useEffect(()=> {
        axios.get(backendEndpoint).then(()=> {
            console.log("Backend live:", backendEndpoint)
        })
    })

    const handleGoogleSignIn = () => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithPopup(auth, googleProvider)
                    .then(result => {
                        const loggedInUser = result.user;
                        setUser(loggedInUser);
                    })
                    .catch(error => {
                        console.log('error', error.message);
                    })
            })
    }

    if (loading) {
        return <Loader/>
    }

    if (!user) {
        return (
            <FlexBox direction="Column" alignItems="Center" className={styles['container']}>
                <IllustratedMessage name="TntCalculator"/>
                <Title>SpareSquare</Title>
                <Button onClick={handleGoogleSignIn} icon="visits" iconEnd> Sign in with Google</Button>
            </FlexBox>
        )
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider

export const useCurrentUser = () => React.useContext(AuthContext)
