import {
    // browserSessionPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    User
} from "firebase/auth";
import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import {Loader} from "@ui5/webcomponents-react";
import {auth} from "../firebase.tsx";
import "@ui5/webcomponents-fiori/dist/illustrations/tnt/Calculator"
import axios from "axios";


interface Props {
    children: ReactElement
}

interface UserContext {
    user: User | null,
    handleGoogleSignIn: () => void
    handleLogout: () => void
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
    useEffect(() => {
        axios.get(backendEndpoint).then(() => {
            console.log("Backend live:", backendEndpoint)
        })
    })

    const handleGoogleSignIn = () => {
        setPersistence(auth, browserLocalPersistence)
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

    // TODO: Implement logout
    const handleLogout = () => {

        setUser(null);

    }

    const value: UserContext = {
        user,
        handleGoogleSignIn,
        handleLogout
    };

    if (loading) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider

export const useCurrentUser = () => useContext(AuthContext)
