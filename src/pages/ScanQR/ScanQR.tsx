import {Scanner} from "@yudiel/react-qr-scanner";
import {Label, Loader, Switch, Text} from "@ui5/webcomponents-react";
import { useState} from "react";
import {useInvoiceProcessor, useInvoiceSimpleProcessor} from "../../services/invoice-processor.tsx";

import axios from "axios";

const backendEndpoint = "https://invoice-processor.onrender.com"
const ScanQR = () => {
    const {data, error, isLoading, processInvoice} = useInvoiceProcessor();
    const { isLoading: simpleIsLoading, processSimpleInvoice} = useInvoiceSimpleProcessor();
    const [executed, setExecuted] = useState(false);
    const [advancedProcessing, setAdvancedProcessing] = useState(false);


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
                                    processSimpleInvoice(detectedCode.rawValue).then(()=> {
                                        console.log("Simple invoice created");
                                    })
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
            {(isLoading || simpleIsLoading) && <Loader/>}
            {data && 'QR processed'}
            {error && <Text>{error}</Text>}

        </>
    )
}

export default ScanQR