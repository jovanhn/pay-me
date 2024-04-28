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



// {
//     name: 'John Doe',
//     country: 'Serbia',
//     city: 'Belgrade',
//     street: 'Bul. Kralja Aleksandra 18',
//     mail: 'john.doe@gmail.com',
//     bank: 'Mobi',
//     account_number: '160-12387812325456-12',
// }