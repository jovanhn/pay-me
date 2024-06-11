import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.tsx";


export const getUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    return docSnap.data()
}