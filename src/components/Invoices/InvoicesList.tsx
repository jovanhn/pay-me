import InvoiceCard from "./InvoiceCard.tsx";
import {collection, getDocs, where, query} from "firebase/firestore";
import {db} from "../../firebase.tsx";
import {Invoice} from "../../interfaces/entities.tsx";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";
import {useEffect, useState} from "react";
import {Button} from "@ui5/webcomponents-react";
import {Timestamp} from "firebase/firestore";
import {useInvoiceProcessor} from "../../services/invoice-processor.tsx";
import {useNavigate} from "react-router-dom";


interface InvoicesListProps {
    date: Date
}

const url = "https://suf.purs.gov.rs/v/?vl=AzlWTUVLTVNOREJWOEdQTzA2FjwASxM8AEBCDwAAAAAAAAABjxpRbD8AAAAoRjk1cDtav%2FKlSwzrhQssXEjOfkqzH6hpmh9zYRVXvhkhD6ukvvO8oibiza7eK9EA6APXbqCvwevn1%2B9ZhozeVLlza3cCMfGG3qE5DBhU9%2FqWMa4kz2oK9HvGg33QVnfqrhO7TC26qKFi%2BCpmfjwwrq37x%2Fl%2FxsnRh71QrXkf2XlBQ5RX68brZTOvAKqn7L27FajTemGox5MUqxZPOlsgTKKBPhmccfTQSb0lxFqB%2FuyjVwJJtb0KHx%2FyMk53%2F53wXE90VvvmsBTtSQFL30G5kEgXhCICx4yEGnqaRux81kXlExmeZzbgIp7UjrruiBpXWAvkUZnbGxpcvggXBFRkuA9%2FfQS01QMKmvfO8RSM%2F6YMqMarjYjbMhanbg%2FxYJ%2Bsc2VHLYj21XXgYkFWTX7789VNgEO24adz5VN2%2FkBGvXx%2BfhDpsY1btscYZSV%2BH%2FDkNxXZmmdAYjkF2aCQSN9oXBTZZJlZG2RpXrUAMwM8yUAIChDruDQgKT3pRvGdE%2FwVU1F%2BNI1L4GPCy5MSX7tCjq1TdfAOE2BpsMsQBfGRRnif%2Bapx7WfpJaLGx7TpA3EnGgM1qqMXwNSys%2F%2FzOpIXpqgA%2FPdA2p0CkKLmZPySJbpkVN%2FqQsuDxid7zuiTWYN%2FZXITThN%2BlSRCBunOBJ%2BgFMZ4sg4UD83RZLrZ6a1feXz6tWt9X4oox2MB%2FhQ3CXM%3D"


const InvoicesList = ({date}: InvoicesListProps) => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const {user} = useCurrentUser()
    const [total, setTotal] = useState<number>(0);
    const {data, processInvoice} = useInvoiceProcessor();
    const navigate = useNavigate();

    const fetchInvoices = () => {
        const timestampFrom = Timestamp.fromDate(date)
        const dateTimeTo = new Date(date)
        dateTimeTo.setMonth(date.getMonth() + 1)
        const timestampTo = Timestamp.fromDate(dateTimeTo)
        const colRef = collection(db, "data/invoices", user.uid);
        const q = query(colRef, where("dateTime", ">=", timestampFrom), where("dateTime", "<", timestampTo));

        getDocs(q).then((docsSnap) => {
            const invoicesList: Invoice[] = []
            let totalSum = 0
            docsSnap.docs.map((doc) => {
                const invoice = doc.data() as Invoice;
                invoicesList.push(invoice)
                totalSum += invoice.totalAmount
            })
            setInvoices(invoicesList)
            setTotal(totalSum)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => fetchInvoices(), [date])
    return (<>
            <div>Total: {total} RSD</div>

            {invoices.map((invoice) => (
                <InvoiceCard
                    key={invoice.id}
                    invoice={invoice}
                    refetch={fetchInvoices}/>

            ))}

            <Button onClick={() => {

                navigate('/new-invoice')
                console.log(url);

            }}>Manual input</Button>
            <Button onClick={() => {

                processInvoice(url).then(() => {
                    console.log(data)
                })
                console.log(url);

            }}>Dummy create</Button>

        </>
    )
}

export default InvoicesList