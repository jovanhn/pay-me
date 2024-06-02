import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase.tsx";

import {User} from "firebase/auth"
import {Invoice} from "../interfaces/entities.tsx";
import {useState} from "react";


export const saveInvoice = async (user: User, invoice: Invoice) => {

    await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then((response)=> {
        console.log("Invoice created");
        return response;
    })
}

export const useDeleteInvoice = async (user: User,  invoiceId: string) => {

    await deleteDoc(doc(db, `data/invoices/${user.uid}`, invoiceId)).then((response)=> {
        console.log("Invoice deleted");
        return response;
    })
}
export interface InvoiceQueryParams {
    invoice?: Invoice,
    isLoading: boolean,
    isError: boolean,
}
export const useInvoice = (invoiceId: string):InvoiceQueryParams => {
    const [invoice, setInvoice] = useState<Invoice>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const docRef = doc(db, `data/invoices/${auth.currentUser!.uid}`, invoiceId);
    const docSnap = getDoc(docRef);
    docSnap.then((docSnapData)=> {
        if (docSnapData.exists()) {
            console.log("Document data:", (docSnapData.data() as Invoice));

            setInvoice((docSnapData.data() as Invoice))
            setIsLoading(false)
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setIsError(true)
            setIsLoading(false)
        }
    })


    return {invoice, isLoading, isError}

}

