import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase.tsx";

import {User} from "firebase/auth"
import {Invoice, SharedInvoice} from "../interfaces/entities.tsx";
import {getUserData} from "./user.tsx";
import {useEffect, useState} from "react";

export const saveInvoice = async (user: User, invoice: Invoice) => {

    await setDoc(doc(db, `data/invoices/${user.uid}`, invoice.id), invoice).then((response) => {
        console.log("Invoice created");
        return response;
    })
}

export const useDeleteInvoice = async (user: User, invoiceId: string) => {

    await deleteDoc(doc(db, `data/invoices/${user.uid}`, invoiceId)).then((response) => {
        console.log("Invoice deleted");
        return response;
    })
}

export const getInvoice = async (invoiceId: string) => {
    const docRef = doc(db, `data/invoices/${auth.currentUser!.uid}`, invoiceId);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
}

export const getSharedInvoice = async (invoiceId: string): Promise<SharedInvoice> => {
    const docRef = doc(db, `data/shared/invoices`, invoiceId);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as SharedInvoice
}


export const shareInvoice = async (invoiceId: string, userId: string) => {
    const sharedInvoice = await getSharedInvoice(invoiceId)
    if (sharedInvoice) {
        return sharedInvoice.id
    }

    const invoice = await getInvoice(invoiceId)
    const userData = await getUserData(userId)

    const newSharedInvoice = {...invoice, createdBy: auth.currentUser?.uid, userId: userId, userName: userData!.generalInfo.name, bankAccount: userData!.bankInfo.account_number}
    console.log("Shared Invoice created", newSharedInvoice);
    await setDoc(doc(db, `data/shared/invoices`, invoiceId), newSharedInvoice).then((response) => {
        console.log("Shared Invoice created");
        return response;
    })

}

export const useSharedInvoice =  (invoiceId: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [sharedInvoice, setSharedInvoice] = useState<SharedInvoice>();

    useEffect(() => {
        setIsLoading(true)
        getSharedInvoice(invoiceId).then((response)=> {
            console.log("Shared Invoice fetched", response);
            if (response) {
                setSharedInvoice(response)
            } else {
                setIsError(true)
            }
            setIsLoading(false)
        })
    }, []);

    return {isError, isLoading, sharedInvoice}
}

export const deleteSharedInvoice = async (invoiceId: string) => {
    await deleteDoc(doc(db, `data/shared/invoices`, invoiceId)).then((response) => {
        console.log("Shared Invoice deleted");
        return response;
    })
}





