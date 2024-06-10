import {Button, FlexBox, IllustratedMessage, Title} from "@ui5/webcomponents-react";
import styles from "../auth/AuthProvider.module.scss";

import {useCurrentUser} from "../auth/AuthProvider.tsx";
import { ReactNode} from "react";


interface Props {
    children: ReactNode
}
export const ProtectedRoute = ({ children } :Props) => {
    const {user, handleGoogleSignIn} = useCurrentUser()

    if (!user) {
        return (
            <FlexBox direction="Column" alignItems="Center" className={styles['container']}>
                <IllustratedMessage name="TntCalculator"/>
                <Title>SpareSquare</Title>
                <Button onClick={handleGoogleSignIn} icon="visits" iconEnd> Sign in with Google</Button>
            </FlexBox>
        )
    }

    return children;
};

export default ProtectedRoute;