import {Text} from "@ui5/webcomponents-react";
import {useParams} from "react-router-dom";

const SharedInvoice = () => {
    const invoiceId = useParams();
    console.log(invoiceId);

    // get shared invoice
    // shard invoice except the invoice data needs to have bank data of the invoice creator, at least name and
    // bank number

    // render details page with ability to select one multiple or all items
    // generate QR code or redirect to a bank
    return  <Text>Public data</Text>
}

export default SharedInvoice;