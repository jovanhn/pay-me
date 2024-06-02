import {useParams} from "react-router-dom";
import CreateInvoice from "../CreateInvoice/CreateInvoice.tsx";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../../firebase.tsx";
import {Invoice} from "../../interfaces/entities.tsx";
import {Loader} from "@ui5/webcomponents-react";


const InvoiceDetails = () => {
    const {invoiceId} = useParams()
    const [invoice, setInvoice] = useState<Invoice>();

    useEffect(() => {
        const docRef = doc(db, `data/invoices/${auth.currentUser!.uid}`, invoiceId!);
        const docSnap = getDoc(docRef);
        docSnap.then((docSnapData) => {
            if (docSnapData.exists()) {
                console.log("Document data:", (docSnapData.data() as Invoice));
                setInvoice((docSnapData.data() as Invoice))
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }, [])
    if (!invoice) {
        return <Loader/>
    }
    return (
        <CreateInvoice oldInvoice={invoice}/>
    )
}
export default InvoiceDetails