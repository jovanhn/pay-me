import {Card, CardHeader, Icon, List, StandardListItem} from "@ui5/webcomponents-react";
import {useState} from "react";


const Home = () => {
    const [opened, setOpened] = useState(false)

    const handleOpenClose = () =>  {
        console.log(!opened)
        setOpened(!opened)
    }
    return (
        <>
            <Card
                header={
                    <CardHeader
                        avatar={<Icon name="basket"/>}
                        status="Apr 12, 2024"
                        subtitleText="1282.00 RSD"
                        titleText="Maxi"
                        onClick={handleOpenClose}
                        onClickCapture={() => {
                            handleOpenClose()
                        }}
                    />
                }
                style={{
                    width: '300px'
                }}
            >
                {opened &&
                    <List mode="SingleSelect">
                        <StandardListItem description="2 x 199,00 RSD = 398 RSD">
                            Hleb Durum
                        </StandardListItem>
                        <StandardListItem description="1 x 235,00 RSD = 235 RSD">
                            Jaja 10 kom.
                        </StandardListItem>
                        <StandardListItem description="2kg x 400,00 RSD = 800 RSD">
                            Paradajz
                        </StandardListItem>
                    </List>
                }
            </Card>
        </>
    )
}

export default Home