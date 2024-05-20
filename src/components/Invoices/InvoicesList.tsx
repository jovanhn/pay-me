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

const url = "https://suf.purs.gov.rs/v/?vl=Azc3NkpHUTZHREJWOEdQTzDbAgAAtwIAACD7aQIAAAAAAAABj3lj9DEAAABaXMzppytFpGCHlU79dizKUE%2FZnCrln%2BYebDv12VOl76IpY3xnuQjAOeC5bp4zxIh48SZwVH2OvvRtbIUWzY9zXHHNxnCkom3lD%2Bdq90swNqk9wLIkzMrOGFF7JHvu3f%2Fx0cDj9z1%2F0HuXqcAPmeliZft%2B8OameOVDvYVRsceeyZj1Nq3JvA1G8AZ7wFtA5ZuRbcwPOCAz1qyyc%2ByTH6vm%2FL08GYMSrFJFGjEkSXwTzn4aY5RCm0lpoXFBhqFuVT3TZSPhOurJRpDMhqi2%2BWzrKO1sjPzOMAk3ra4v891bMvVZ5BrwXZ6WeuWW9d%2FjxUcxmrfDjQ2UShY5xYypdavQa9P1xI1gWC7tmNOInAWSSD7Gp5czMqL%2B0h4c1uRriSKF9j2YmD1dn73%2FNsZ7ny3MCKrcsDQnabeeER4q8MaY7CxMNvpOHfBHhZSHGwvAfxwotf07HihPYtNmSRQ3gFtX4LP4%2FHjsex3m1uYJV1ZlA9ruDJmL6FIMrtWvuCIoL%2BOiBkGtmr7A5IszT9vrWUe0wbmmWKW%2FBTJBOQyAprAW99oZ0osN17923TsbkHc3tFv1njFeOj4lWv5s%2FAzMkvMXoYOFtb2Itm%2FI3S064DMUd%2FAaiLFpb3tijM0V2aY76Q5hvGRuy790gOQVGyuCVeYuWYFe0DGm%2BkROu1wxu6XyHLymA%2Bg1J%2BdvbGw0AqTAKgI%3D"


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

                processInvoice(url, true).then(() => {
                    console.log(data)
                    fetchInvoices()
                })
                console.log(url);

            }}>Dummy create</Button>

        </>
    )
}

export default InvoicesList