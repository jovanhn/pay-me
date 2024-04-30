import {useState} from "react";
import {Card, CardHeader, Icon, List, StandardListItem} from "@ui5/webcomponents-react";
import {Invoice} from "../../interfaces/entities.tsx";
const sampleInvoice: Invoice = {
    id: '1',
    items: [
        {name: 'Hleb Durum', price: 199.0, count: 2}],
    rawUrl: '',
    createdAt: 'Apr 12, 2024',
    price: 1923.0,
    location: "Maxi NBG"

}

const InvoiceCard = () => {
    const [opened, setOpened] = useState(false)

    const handleOpenClose = () => {
        setOpened(!opened)
    }
    return (
            <Card
                header={
                    <CardHeader
                        avatar={<Icon name="basket"/>}
                        status={sampleInvoice.createdAt}
                        subtitleText={`${sampleInvoice.price} RSD`}
                        titleText={sampleInvoice.location}
                        onClick={handleOpenClose}
                        onClickCapture={() => {
                            handleOpenClose()
                        }}
                    />
                }

            >
                {opened && (

                    <List mode="SingleSelect">
                        {sampleInvoice.items.map((item) =>
                            <StandardListItem
                                key={item.name}
                                description={`${item.count} x ${item.price} RSD = ${item.price * item.count} RSD`}>
                                {item.name}
                            </StandardListItem>)}
                    </List>)
                }
            </Card>
       )
}

export default InvoiceCard