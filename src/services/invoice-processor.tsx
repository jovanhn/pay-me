import axios, {AxiosError} from "axios";
import {Invoice} from "../interfaces/entities.tsx";
import {useState} from "react";
import {doc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebase.tsx";
import {useCurrentUser} from "../auth/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";


export const useInvoiceProcessor = () => {
    const [data, setData] = useState<Invoice>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const {user} = useCurrentUser()
    const navigate = useNavigate();

    const processInvoice = async (qr_text: string) => {
        setIsLoading(true);
        try {
            // this spins server if it is down
            // await axios.get('https://invoice-processor.onrender.com/')

            const response = await axios.post('https://invoice-processor.onrender.com/dummy/process', {url: qr_text}, {
                headers: {
                    'Host': 'invoice-processor.onrender.com',
                }
            });
            const dateString = response.data.dateTime;

            // Split the date string into its components
            const [day, month, year, time] = dateString.split(/[.\s]+/);
            const dateObject = new Date(`${year}-${month}-${day}T${time}`);

            // Convert the JavaScript Date object to a Firestore Timestamp
            const timestamp = Timestamp.fromDate(dateObject);
            console.log(timestamp);
            response.data.dateTime = timestamp

            setData(response.data);
            const invoice = response.data as Invoice;
            invoice.id = crypto.randomUUID()
            console.log(invoice.totalAmount)
            invoice.totalAmount = Number(invoice.totalAmount.toString().replace(',','.'))
            await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then((response) => {
                console.log("Invoice created");
                console.log(response)

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