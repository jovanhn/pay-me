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
import {useState} from "react";

const Header = () => {
    const showPopover = Modals.useShowPopover();
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState<boolean>()

    return (
        <ShellBar
            logo={<Icon name="monitor-payments"/>}
            onLogoClick={() => navigate('/')}
            onProfileClick={() => {
                showPopover({
                    open: isOpen,
                    opener: 'shellbar-avatar',
                    placementType: 'Bottom',
                    horizontalAlign: 'Right',
                    children: (<List separators="None" data-testid="userMenu">
                        <StandardListItem
                            icon="user-settings"
                            onClick={() => {
                                setOpen(false)
                                navigate('/profile')
                            }}
                            data-testid="userMenuSettings"
                        >
                            Profile Settings
                        </StandardListItem>
                        <StandardListItem
                            icon="log"
                            onClick={() => {


                            }}
                        >
                            Logout
                        </StandardListItem>
                    </List>)
                });
            }}
            onSearchButtonClick={() => {
            }}
            primaryTitle="Spare Square"
            profile={<Avatar id="shellbar-avatar"><Icon name="person-placeholder"/></Avatar>}
            searchField={<Input icon={<Icon interactive name="search"/>} showClearIcon/>
            }
        >
            <ShellBarItem
                icon="qr-code"
                text="QR Scan"
                onClick={() => navigate('/scan-qr')}
            />
            <ShellBarItem
                icon="home"
                text="Home"
                onClick={() => navigate('/')}
            />
        </ShellBar>
    )
}

export default Header