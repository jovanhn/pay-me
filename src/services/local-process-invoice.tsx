import axios from "axios";
import * as cheerio from 'cheerio';
import {Timestamp} from "firebase/firestore";


export const fieldsLabelToModelMap: Record<string,string> =

    {
        'shopFullNameLabel': 'shopFullName',
        'totalAmountLabel': 'totalAmount',
        'sdcDateTimeLabel': 'dateTime',
        'addressLabel': 'address',
        'invoiceNumberLabel': 'invoiceNumber'
    }


export const qrExtractorHtml = async (url:string) => {
    console.log("qrExtractorHtml started");
    console.time("Simple processing");

    try {
        const urlObj = new URL(url)
        const pathname = urlObj.href.replace(urlObj.origin, '');
        console.log(pathname);
        const data = await axios.get(pathname)

        // const html = await extractHTML(url);
        const $: cheerio.CheerioAPI = cheerio.load(data.data);

        const invoice: any = {
            id: crypto.randomUUID(),
            totalAmount: 0,
            dateTime: Timestamp.fromDate(new Date()),
            shopFullName: '',
            address: '',
            invoiceNumber: '',
            currency: 'RSD',
            type: 'QR',
            items: []
        }
        Object.keys(fieldsLabelToModelMap).forEach((field: string) => {
            invoice[fieldsLabelToModelMap[field]] = extractFiledValue(field, $)

        })

        console.timeEnd("Simple processing");
        return invoice

    } catch (e) {
        console.error(e);
        throw e;
    }
}

const extractFiledValue = (fieldName:string, $: cheerio.CheerioAPI) => {
    try {
        return $(`#${fieldName}`).text().trim()
    } catch (error) {
        console.error(`Unable to extract field: ${fieldName} `, error);
    }
    return ""
}


