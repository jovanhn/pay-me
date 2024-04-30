import InvoiceCard from "./InvoiceCard.tsx";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase.tsx";
import {Invoice} from "../../interfaces/entities.tsx";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";
import {useEffect, useState} from "react";
import {Button} from "@ui5/webcomponents-react";
import {useCreateInvoice} from "../../services/Invoices.tsx";


const InvoicesList = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const {user} = useCurrentUser()

    const fetchInvoices = () => {
        const colRef = collection(db, "data/invoices", user.uid);
        getDocs(colRef).then((docsSnap) => {
            const invoicesList: Invoice[] = []
            console.log("loaded")
            docsSnap.docs.map((doc) => {
                doc.data()
                invoicesList.push(doc.data() as Invoice)
            })
            setInvoices(invoicesList)
        }).catch((err) => {
            console.log(err)
        });
    }
    const handleNewInvoice = (invoice: Invoice) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCreateInvoice(user, invoice).then(r => {
            console.log(r)
            fetchInvoices()
        })

    }
    useEffect(() => fetchInvoices(), [])
    return (<>
            {invoices.map((invoice) => (
                <InvoiceCard
                    key={invoice.id}
                    data={invoice}/>
            ))}
            <Button onClick={() => handleNewInvoice(
                {
                    id: crypto.randomUUID(),
                    location: "MAXI",
                    rawUrl: "teset",
                    price: 1,
                    items: [{name: "test", count: 1, price: 1}],
                } as Invoice
            )}>Add invoice</Button>
        </>
    )
}

export default InvoicesList