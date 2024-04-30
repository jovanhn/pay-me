import {
    GoogleAuthProvider,
    signInWithPopup,
    User
} from "firebase/auth";
import React, {createContext, ReactElement, useState} from "react";
import {auth} from "../firebase.tsx";
import {Button} from "@ui5/webcomponents-react";


interface Props {
    children: ReactElement
}

interface UserContext {
    user: User,
    setUser: (user: User) => void
}

const AuthContext = createContext({} as UserContext)

const AuthProvider = ({children}: Props): ReactElement => {
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState<User>();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    if (!user) {
        return <>
            <Button onClick={handleGoogleSignIn}> Sign in with google</Button>
        </>
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider

export const useCurrentUser = () => React.useContext(AuthContext)
