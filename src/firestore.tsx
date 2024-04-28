// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByHuc8c0CvCCsh2gK2v_SK-LYVexzqFJ4",
    authDomain: "spare-square-421619.firebaseapp.com",
    projectId: "spare-square-421619",
    storageBucket: "spare-square-421619.appspot.com",
    messagingSenderId: "384493949269",
    appId: "1:384493949269:web:b6fee414d03f69eadf9fdc",
    measurementId: "G-ZX234VQTSS"
};

// Initialize Firebase
const FirestoreApp = initializeApp(firebaseConfig);
export default FirestoreApp