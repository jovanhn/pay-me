import {Scanner} from "@yudiel/react-qr-scanner";
import {Label, Loader, Switch, Text} from "@ui5/webcomponents-react";
import {useState} from "react";
import {useInvoiceProcessor} from "../../services/invoice-processor.tsx";
import {qrExtractorHtml} from "../../services/local-process-invoice.tsx";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../../firebase.tsx";
import {Invoice} from "../../interfaces/entities.tsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const backendEndpoint = "https://invoice-processor.onrender.com"
const ScanQR = () => {
    const {data, error, isLoading, processInvoice} = useInvoiceProcessor();
    const [executed, setExecuted] = useState(false);
    const [advancedProcessing, setAdvancedProcessing] = useState(false);
    const navigate = useNavigate();
    return (<>
            <div style={{display: "flex"}}>
                <Label style={{alignItems: 'center'}}>Advanced processing</Label>
                <Switch onChange={(e) => {
                    if (!advancedProcessing) {
                        axios.get(backendEndpoint).then((response) => {
                            console.log("Backend live:", response)
                        })
                    }
                    setAdvancedProcessing(e.target.checked);
                }}/>
            </div>
            <Scanner
                onScan={(detectedCodes) => {
                    detectedCodes.forEach((detectedCode) => {
                        if (detectedCode.rawValue.startsWith("https://suf.purs.gov.rs/")) {
                            if (!executed) {
                                setExecuted(true);
                                if (!advancedProcessing) {
                                    qrExtractorHtml(detectedCode.rawValue).then((invoice: Invoice) => {
                                        invoice.totalAmount = Number(invoice.totalAmount.toString().replace('.', '').replace(',', '.'))
                                        setDoc(doc(db, `data/invoices/${auth.currentUser?.uid}`, invoice.id), invoice).then(() => {
                                            console.log("Invoice created");

                                            navigate('/')
                                        }).catch((errorInserting) => {
                                            console.log(errorInserting)
                                        })
                                    });

                                } else {
                                    processInvoice(detectedCode.rawValue).then(() => {
                                        console.log('Processed successfully');
                                    })
                                }
                            }
                        }
                    })


                }}
            />
            {isLoading && <Loader/>}
            {data && 'QR processed'}
            {error && <Text>{error}</Text>}

        </>
    )
}

export default ScanQR