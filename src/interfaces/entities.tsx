import {Timestamp} from "firebase/firestore";

export interface UserProfile {
    generalInfo: GeneralInfo
    bankInfo: BankInfo
}

export interface GeneralInfo {
    name: string,
    country: string,
    city: string,
    street: string,
    mail: string
}

export interface BankInfo {
    name: string,
    account_number: string
}

export interface Invoice {
    id: string,
    totalAmount: number,
    dateTime: Timestamp,
    shopFullName: string,
    address: string,
    invoiceNumber: string,
    currency: string,
    type: string,
    items: Item[]
}

export interface Item {
    id: string,
    name: string,
    amount: number,
    priceWithVat: number,
    totalPrice: number
}