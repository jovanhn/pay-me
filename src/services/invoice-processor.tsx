import axios, {AxiosError} from "axios";
import {Invoice} from "../interfaces/entities.tsx";
import {useState} from "react";
import {doc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebase.tsx";
import {useCurrentUser} from "../auth/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";
import {qrExtractorHtml} from "./local-process-invoice.tsx";

const backendEndpoint = "https://invoice-processor.onrender.com/process"


export const useInvoiceProcessor = () => {
    const [data, setData] = useState<Invoice>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const {user} = useCurrentUser()
    const navigate = useNavigate();


    const processInvoice = async (qr_text: string) => {
        setIsLoading(true);
        console.log("Advanced processing invoice");

        try {
            // this spins server if it is down
            // await axios.get('https://invoice-processor.onrender.com/')

            const response = await axios.post(backendEndpoint, {url:qr_text});
            const dateString = response.data.dateTime.split(' ')[0];
            let timeString = response.data.dateTime.split(' ')[1];

            const hourRegex: RegExp = /^(\d{1,2}):/;

            // Find the hour part
            const hourMatch: RegExpMatchArray | null = timeString.match(hourRegex);

            // If hour part is found
            if (hourMatch) {
                let hour: string = hourMatch[1];
                // Convert to two digits
                hour = hour.padStart(2, '0');
                // Replace hour part in the string
                timeString = timeString.replace(hourRegex, hour + ':');

            }
            // Split the date string into its components

            const [day, month, year] = dateString.split('.')

            const dateObject = new Date(`${year}-${month}-${day}T${timeString}`);

            // Convert the JavaScript Date object to a Firestore Timestamp
            const timestamp = Timestamp.fromDate(dateObject);
            response.data.dateTime = timestamp

            setData(response.data);
            const invoice = response.data as Invoice;
            invoice.id = crypto.randomUUID()
            invoice.totalAmount = Number(invoice.totalAmount.toString().replace('.', '').replace(',', '.'))
            await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then(() => {
                console.log("Invoice created");

                navigate('/')
            }).catch((errorInserting) => {
                console.log(errorInserting)
            })
        } catch (err) {
            const e = err as AxiosError;
            console.log(e.message)
            console.log(e.name)
            console.log(e.stack)
            console.log(e.response)
            setError(`Error: ${e.message}`);
        } finally {
            setIsLoading(false);
        }

    };


    // Dependency array ensures useEffect runs when url changes

    return {data, error, isLoading, processInvoice};
};

export const useInvoiceSimpleProcessor = () => {
    const [data, setData] = useState<Invoice>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const {user} = useCurrentUser()
    const navigate = useNavigate();


    const processSimpleInvoice = async (qr_text: string) => {
        console.log("Simple processing invoice");
        setIsLoading(true);
        const invoice = await qrExtractorHtml(qr_text)
        const dateString = invoice.dateTime.split(' ')[0];
        let timeString = invoice.dateTime.split(' ')[1];

        const hourRegex: RegExp = /^(\d{1,2}):/;

        // Find the hour part
        const hourMatch: RegExpMatchArray | null = timeString.match(hourRegex);

        // If hour part is found
        if (hourMatch) {
            let hour: string = hourMatch[1];
            // Convert to two digits
            hour = hour.padStart(2, '0');
            // Replace hour part in the string
            timeString = timeString.replace(hourRegex, hour + ':');

        }
        // Split the date string into its components

        const [day, month, year] = dateString.split('.')

        const dateObject = new Date(`${year}-${month}-${day}T${timeString}`);

        const timestamp = Timestamp.fromDate(dateObject);
        invoice.dateTime = timestamp

        invoice.totalAmount = Number(invoice.totalAmount.toString().replace('.', '').replace(',', '.'))
        await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then(() => {
            console.log("Invoice created a");
            console.log(invoice)
            setData(invoice);
            setIsLoading(false)
            navigate('/')
        }).catch((errorInserting) => {
            console.log(errorInserting)
            setError(`Error: ${errorInserting}`)
        })
    }


    return {data, error, isLoading, processSimpleInvoice};

}