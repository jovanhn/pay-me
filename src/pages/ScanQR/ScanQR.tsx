import {Scanner} from "@yudiel/react-qr-scanner";
import {Text} from "@ui5/webcomponents-react";
import {useState} from "react";

const ScanQR = () => {
    const [qrCode, setQrCode] = useState("");
    return (<>
            <Scanner
                onResult={(text, result) => {
                    setQrCode(text);
                    console.log(result);

                }}
                onError={(error) => console.log(error?.message)}
            />
            <Text>{qrCode}</Text>
        </>
    )
}

export default ScanQR