import {useState} from "react";
import {Button, Card, CardHeader, Icon, List, Modals, StandardListItem} from "@ui5/webcomponents-react";
import {Invoice, Item} from "../../interfaces/entities.tsx";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase.tsx";

interface InvoiceCardProps {
    invoice: Invoice,
    refetch: () => void,
}

const InvoiceCard = ({invoice, refetch}: InvoiceCardProps) => {
    const [opened, setOpened] = useState(false)
    const {user} = useCurrentUser()
    const handleOpenClose = () => {
        if (invoice.items?.length >0) {
            setOpened(!opened)
        }
    }
    const showPopover = Modals.useShowPopover()

    const handleDelete = (id: string) => {
        void deleteDoc(doc(db, `data/invoices/${user.uid}`, id)).then(() => {
            refetch()
        })
    }

    return (
        <Card
            header={
                <CardHeader
                    avatar={<Icon name="basket"/>}
                    // status={data.dateTime}
                    subtitleText={`${invoice.totalAmount} RSD`}
                    titleText={invoice.shopFullName}
                    action={
                        <>
                            <Button onClick={handleOpenClose} icon={opened ? "collapse" : "expand"}
                                    design="Transparent"/>
                            <Button
                                id="openMoreBtn"
                                onClick={() => {
                                    const {close} = showPopover({
                                        opener: 'openMoreBtn',
                                        children: (<List separators="None" data-testid="more-menu">
                                            <StandardListItem
                                                iconEnd
                                                icon="detail-more"
                                                onClick={() => {
                                                }}
                                                data-testid="userMenuSettings"
                                            >
                                                Details
                                            </StandardListItem>
                                            <StandardListItem
                                                icon="delete"
                                                iconEnd
                                                onClick={() => {
                                                    handleDelete(invoice.id)
                                                    close()
                                                }}
                                            >
                                                Delete
                                            </StandardListItem>
                                        </List>)
                                    })
                                }
                                }
                                icon="overflow"
                                design="Transparent"/>
                        </>
                    }
                />
            }

        >
            {opened && invoice.items && (

                <List mode="SingleSelect">
                    {invoice.items.map((item: Item) =>
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