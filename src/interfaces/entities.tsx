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
    location: string
    createdAt: string,
    price: number
    rawUrl: string,
    items: InvoiceItem[]
}

export interface InvoiceItem {
    name: string,
    count: number,
    price: number,
}