import {useState} from "react";
import {Button, Card, CardHeader, Icon, List, StandardListItem} from "@ui5/webcomponents-react";
import {Invoice, InvoiceItem} from "../../interfaces/entities.tsx";
import {useDeleteInvoice} from "../../services/Invoices.tsx";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";


const InvoiceCard = ({data}: {data: Invoice}) => {
    const [opened, setOpened] = useState(false)
    const {user} = useCurrentUser()
    const handleOpenClose = () => {
        setOpened(!opened)
    }

    const handleDelete = (id: string) => {
        useDeleteInvoice(user,id)
    }

    return (
            <Card
                header={
                    <CardHeader
                        avatar={<Icon name="basket"/>}
                        status={data.createdAt}
                        subtitleText={`${data.price} RSD`}
                        titleText={data.location}
                        action={<><Button onClick={handleOpenClose}>Show More</Button> <Button onClick={() => handleDelete(data.id)}>Delete</Button></>}
                    />
                }

            >
                {opened && (

                    <List mode="SingleSelect">
                        {data.items.map((item :InvoiceItem) =>
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