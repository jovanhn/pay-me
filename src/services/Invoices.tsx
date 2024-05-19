import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase.tsx";

import {User} from "firebase/auth"
import {Invoice} from "../interfaces/entities.tsx";


export const createInvoice = async (user: User, invoice: Invoice) => {

    await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then((response)=> {
        console.log("Invoice created");
        console.log(response)
        return response;
    })
}

export const useDeleteInvoice = async (user: User,  invoiceId: string) => {

    await deleteDoc(doc(db, `data/invoices/${user.uid}`, invoiceId)).then((response)=> {
        console.log("Invoice deleted");
        console.log(response)
        return response;
    })
}

