import {
    Avatar,
    Icon,
    Input, List,
    Modals,
    ShellBar,
    ShellBarItem,
    StandardListItem,
} from "@ui5/webcomponents-react";

const Header = () => {
    const showPopover = Modals.useShowPopover();

    return(
        <ShellBar
            logo={<Icon name="monitor-payments" />}
            onLogoClick={()=> {}}
            onProfileClick={() => {
                showPopover({
                    opener: 'shellbar-avatar',
                    placementType: 'Bottom',
                    horizontalAlign: 'Right',
                    children: (<List separators="None" data-testid="userMenu">
                        <StandardListItem
                            icon="user-settings"
                            onClick={() => {
                            }}
                            data-testid="userMenuSettings"
                        >
                            Profile Settings
                        </StandardListItem>
                        <StandardListItem
                            icon="log"
                            onClick={() => {
                            }
                            }
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
        />
    </ShellBar>
)
}

export default Header