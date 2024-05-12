import axios from "axios";
import {Invoice} from "../interfaces/entities.tsx";
import {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
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
        console.log("Calling once")
        setIsLoading(true);
        try {
            // this spins server if it is down
            await axios.get('https://invoice-processor.onrender.com/')
            const response = await axios.post('https://invoice-processor.onrender.com/process', {url: qr_text});
            setData(response.data);
            const invoice = response.data;
            invoice.id = crypto.randomUUID()
            await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then((response) => {
                console.log("Invoice created");
                console.log(response)
                navigate('/')
            }).catch((errorInserting) => {
                console.log(errorInserting)
            })
        } catch (err) {
            console.log(err)
            setError(`Error: ${err}`);
        } finally {
            setIsLoading(false);
        }

    };


    // Dependency array ensures useEffect runs when url changes

    return {data, error, isLoading, processInvoice};
};