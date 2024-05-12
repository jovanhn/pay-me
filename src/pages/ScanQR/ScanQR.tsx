import {Scanner} from "@yudiel/react-qr-scanner";
import {Loader, Text} from "@ui5/webcomponents-react";
import {useState} from "react";
import {useInvoiceProcessor} from "../../services/invoice-processor.tsx";

const ScanQR = () => {
    const [qrCode, setQrCode] = useState("");
    const {data, error, isLoading, processInvoice} = useInvoiceProcessor();
    const [executed, setExecuted] = useState(false);
    return (<>
            <Scanner
                onResult={(text, result) => {
                    if (text.startsWith("https://suf.purs.gov.rs/")) {
                        if(!executed) {
                            setExecuted(true);
                            setQrCode(text);
                            processInvoice(text).then(() => {
                                setQrCode('Done')
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
            <Text>{qrCode}</Text>
        </>
    )
}

export default ScanQR