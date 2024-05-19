import {Scanner} from "@yudiel/react-qr-scanner";
import { Label, Loader, Switch, Text} from "@ui5/webcomponents-react";
import {useState} from "react";
import {useInvoiceProcessor} from "../../services/invoice-processor.tsx";

const ScanQR = () => {
    const {data, error, isLoading, processInvoice} = useInvoiceProcessor();
    const [executed, setExecuted] = useState(false);
    const [isSimpleProcess, setSimpleProcess] = useState(false);
    return (<>
            <div style={{display: "flex"}}>
            <Label style={{alignItems:'center'}}>Simple process</Label>
                <Switch onChange={(e)=> {
                    setSimpleProcess(e.target.checked);
                }}/>
            </div>
            <Scanner
                onResult={(text, result) => {
                    if (text.startsWith("https://suf.purs.gov.rs/")) {
                        if(!executed) {
                            setExecuted(true);
                            processInvoice(text, isSimpleProcess).then(() => {
                                console.log('Processed successfully');
                            })
                            console.log(result);
                        }
                    }

                }}
                onError={(error) => console.log(error?.message)}
            />
            {isLoading && <Loader/>}
            {data && 'QR processed'}
            {error && <Text>{error}</Text>}

        </>
    )
}

export default ScanQR