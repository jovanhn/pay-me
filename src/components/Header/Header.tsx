import {
    Avatar,
    Icon,
    Input,
    ShellBar,
    ShellBarItem,
} from "@ui5/webcomponents-react";

const Header = () => (
    <ShellBar
        logo={<Icon name="border" />}
        onLogoClick={()=> {}}
        onProfileClick={()=> {}}
        onSearchButtonClick={function _a(){}}
        primaryTitle="Spare Square"
        profile={<Avatar><Icon name="border"/></Avatar>}
        searchField={<Input icon={<Icon interactive name="search"/>} showClearIcon/>}
    >
        <ShellBarItem
            icon="border"
            text="QR Scan"
        />
        <ShellBarItem
            icon="bell"
            text="Home"
        />
    </ShellBar>
)

export default Header