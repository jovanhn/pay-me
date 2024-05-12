import {useState} from "react";
import {Button, Card, CardHeader, Icon, List, StandardListItem} from "@ui5/webcomponents-react";
import {Invoice, Item} from "../../interfaces/entities.tsx";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase.tsx";


const InvoiceCard = ({data}: {data: Invoice}) => {
    const [opened, setOpened] = useState(false)
    const {user} = useCurrentUser()
    const handleOpenClose = () => {
        setOpened(!opened)
    }

    const handleDelete = (id: string) => {
         void deleteDoc(doc(db, `data/invoices/${user.uid}`, id))
    }

    return (
            <Card
                header={
                    <CardHeader
                        avatar={<Icon name="basket"/>}
                        // status={data.dateTime}
                        subtitleText={`${data.totalAmount} RSD`}
                        titleText={data.shopFullName}
                        action={<><Button onClick={handleOpenClose}>Show More</Button> <Button onClick={() => handleDelete(data.id)}>Delete</Button></>}
                    />
                }

            >
                {opened && data.items &&(

                    <List mode="SingleSelect">
                        {data.items.map((item :Item) =>
                            <StandardListItem
                                key={item.name}
                                description={`${item.amount} x ${item.priceWithVat} RSD = ${item.totalPrice} RSD`}>
                                {item.name}
                            </StandardListItem>)}
                    </List>)
                }
            </Card>
       )
}

export default InvoiceCard