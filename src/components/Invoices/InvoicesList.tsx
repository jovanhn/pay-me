import InvoiceCard from "./InvoiceCard.tsx";
import {collection, getDocs, where, query, orderBy} from "firebase/firestore";
import {db} from "../../firebase.tsx";
import {Invoice} from "../../interfaces/entities.tsx";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";
import {useEffect, useState} from "react";
import {Timestamp} from "firebase/firestore";
import {IllustratedMessage} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData"

interface InvoicesListProps {
    date: Date
    setMonthExpenses: (sum: number) => void
}

const InvoicesList = ({date, setMonthExpenses}: InvoicesListProps) => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const {user} = useCurrentUser()

    const fetchInvoices = () => {
        const timestampFrom = Timestamp.fromDate(date)
        const dateTimeTo = new Date(date)
        dateTimeTo.setMonth(date.getMonth() + 1)
        const timestampTo = Timestamp.fromDate(dateTimeTo)
        const colRef = collection(db, "data/invoices", user.uid);
        const q = query(colRef,
            where("dateTime", ">=", timestampFrom),
            where("dateTime", "<", timestampTo),
            orderBy("dateTime", "desc"));

        getDocs(q).then((docsSnap) => {
            const invoicesList: Invoice[] = []
            let totalSum = 0
            docsSnap.docs.map((doc) => {
                const invoice = doc.data() as Invoice;
                invoicesList.push(invoice)
                totalSum += invoice.totalAmount
            })
            setInvoices(invoicesList)
            setMonthExpenses(totalSum)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => fetchInvoices(), [date])

    if (invoices.length === 0) {
        return <IllustratedMessage name="NoData"/>
    }
    return (<>
            {invoices.map((invoice) => (
                <InvoiceCard
                    key={invoice.id}
                    invoice={invoice}
                    refetch={fetchInvoices}/>
            ))}
        </>
    )
}

export default InvoicesList