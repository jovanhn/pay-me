import { Card, CardHeader, Icon} from "@ui5/webcomponents-react";
import {Invoice} from "../../interfaces/entities.tsx";

import {useNavigate} from "react-router-dom";

interface InvoiceCardProps {
    invoice: Invoice,
    refetch: () => void,
}

const InvoiceCard = ({invoice}: InvoiceCardProps) => {
    // const [opened, setOpened] = useState(false)
    // const {user} = useCurrentUser()
    const navigate = useNavigate()
    // const handleOpenClose = () => {
    //     if (invoice.items?.length > 0) {
    //         setOpened(!opened)
    //     }
    // }
    // const showPopover = Modals.useShowPopover()
    //
    // const handleDelete = (id: string) => {
    //     void deleteDoc(doc(db, `data/invoices/${user.uid}`, id)).then(() => {
    //         refetch()
    //     })
    // }
    return (
        <Card
            onClick={() => {
                console.log("InvoiceSelected");
            }}
            // onClickCapture={() => {
            //     console.log("InvoiceSelected");
            //     navigate(`/invoices/${invoice.id}`, {})
            //
            // }}
            style={{padding: '0.5rem 0'}}
            header={
                <CardHeader
                    onClickCapture={() => {
                        console.log("InvoiceSelected");
                        navigate(`/invoices/${invoice.id}`, {})

                    }}
                    onSelect={() => {
                        console.log("InvoiceSelected");
                    }}
                    avatar={<Icon name="basket"/>}
                    status={invoice.dateTime.toDate().toLocaleDateString('en-us', {month: "long", day: "numeric", hour:"numeric", minute:"numeric"})}
                    subtitleText={`${invoice.totalAmount} RSD`}
                    titleText={invoice.shopFullName}
                />
            }

        />
    )
}

export default InvoiceCard