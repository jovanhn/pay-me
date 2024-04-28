import {
    Avatar,
    Icon,
    Input, List,
    Modals,
    ShellBar,
    ShellBarItem,
    StandardListItem,
} from "@ui5/webcomponents-react";
import {useNavigate} from "react-router-dom";
import {googleLogout, TokenResponse} from "@react-oauth/google";

interface UserProps {
    user: Omit<TokenResponse, "error" | "error_description" | "error_uri">
    setUser: (userCreds: Omit<TokenResponse, "error" | "error_description" | "error_uri"> | undefined) => void
}

const Header = ({ setUser} : UserProps) => {
    const showPopover = Modals.useShowPopover();
    const navigate = useNavigate()

    const logOut = () => {
        googleLogout();
        setUser(undefined)
    };
    return(
        <ShellBar
            logo={<Icon name="monitor-payments" />}
            onLogoClick={ () => navigate('/')}
            onProfileClick={() => {
                showPopover({
                    opener: 'shellbar-avatar',
                    placementType: 'Bottom',
                    horizontalAlign: 'Right',
                    children: (<List separators="None" data-testid="userMenu">
                        <StandardListItem
                            icon="user-settings"
                            onClick={() => navigate('/profile')}
                            data-testid="userMenuSettings"
                        >
                            Profile Settings
                        </StandardListItem>
                        <StandardListItem
                            icon="log"
                            onClick={logOut}
                        >
                            Logout
                        </StandardListItem>
                    </List>)
                });
            }}
            onSearchButtonClick={()=>{}}
            primaryTitle="Spare Square"
            profile={<Avatar id="shellbar-avatar"><Icon name="person-placeholder"/></Avatar>}
            searchField={<Input icon={<Icon interactive name="search"/>} showClearIcon/>
}
    >
        <ShellBarItem
            icon="qr-code"
            text="QR Scan"
        />
        <ShellBarItem
            icon="home"
            text="Home"
            onClick={ () => navigate('/')}
        />
    </ShellBar>
)
}

export default Header