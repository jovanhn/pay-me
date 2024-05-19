import axios, {AxiosError} from "axios";
import {Invoice} from "../interfaces/entities.tsx";
import {useState} from "react";
import {doc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebase.tsx";
import {useCurrentUser} from "../auth/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

const serivceUrl = "https://invoice-processor.onrender.com/process"
const simpleServiceUrl = "https://invoice-processor.onrender.com/simple/process"

export const useInvoiceProcessor = () => {
    const [data, setData] = useState<Invoice>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const {user} = useCurrentUser()
    const navigate = useNavigate();


    const processInvoice = async (qr_text: string, isSimpleService: boolean) => {
        setIsLoading(true);
        try {
            // this spins server if it is down
            // await axios.get('https://invoice-processor.onrender.com/')

            const response = await axios.post(isSimpleService? simpleServiceUrl: serivceUrl, {url: qr_text});
            const dateString = response.data.dateTime.split(' ')[0];
            const timeString = response.data.dateTime.split(' ')[1];
            // Split the date string into its components

            const [day, month, year] = dateString.split('.')

            const dateObject = new Date(`${year}-${month}-${day}T${timeString}`);

            // Convert the JavaScript Date object to a Firestore Timestamp
            const timestamp = Timestamp.fromDate(dateObject);
            console.log(timestamp);
            response.data.dateTime = timestamp

            setData(response.data);
            const invoice = response.data as Invoice;
            invoice.id = crypto.randomUUID()
            console.log(invoice.totalAmount)
            invoice.totalAmount = Number(invoice.totalAmount.toString().replace('.','').replace(',','.'))
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