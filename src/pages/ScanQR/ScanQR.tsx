import {Scanner} from "@yudiel/react-qr-scanner";
import {Button, Loader, Text} from "@ui5/webcomponents-react";
import {useState} from "react";
import {useInvoiceProcessor} from "../../services/invoice-processor.tsx";

const url = "https://suf.purs.gov.rs/v/?vl=AzlWTUVLTVNOREJWOEdQTzA2FjwASxM8AEBCDwAAAAAAAAABjxpRbD8AAAAoRjk1cDtav%2FKlSwzrhQssXEjOfkqzH6hpmh9zYRVXvhkhD6ukvvO8oibiza7eK9EA6APXbqCvwevn1%2B9ZhozeVLlza3cCMfGG3qE5DBhU9%2FqWMa4kz2oK9HvGg33QVnfqrhO7TC26qKFi%2BCpmfjwwrq37x%2Fl%2FxsnRh71QrXkf2XlBQ5RX68brZTOvAKqn7L27FajTemGox5MUqxZPOlsgTKKBPhmccfTQSb0lxFqB%2FuyjVwJJtb0KHx%2FyMk53%2F53wXE90VvvmsBTtSQFL30G5kEgXhCICx4yEGnqaRux81kXlExmeZzbgIp7UjrruiBpXWAvkUZnbGxpcvggXBFRkuA9%2FfQS01QMKmvfO8RSM%2F6YMqMarjYjbMhanbg%2FxYJ%2Bsc2VHLYj21XXgYkFWTX7789VNgEO24adz5VN2%2FkBGvXx%2BfhDpsY1btscYZSV%2BH%2FDkNxXZmmdAYjkF2aCQSN9oXBTZZJlZG2RpXrUAMwM8yUAIChDruDQgKT3pRvGdE%2FwVU1F%2BNI1L4GPCy5MSX7tCjq1TdfAOE2BpsMsQBfGRRnif%2Bapx7WfpJaLGx7TpA3EnGgM1qqMXwNSys%2F%2FzOpIXpqgA%2FPdA2p0CkKLmZPySJbpkVN%2FqQsuDxid7zuiTWYN%2FZXITThN%2BlSRCBunOBJ%2BgFMZ4sg4UD83RZLrZ6a1feXz6tWt9X4oox2MB%2FhQ3CXM%3D"
// const url2 = "https://suf.purs.gov.rs/v/?vl=Azc3NkpHUTZHREJWOEdQTzDbAgAAtwIAACD7aQIAAAAAAAABj3lj9DEAAABaXMzppytFpGCHlU79dizKUE%2FZnCrln%2BYebDv12VOl76IpY3xnuQjAOeC5bp4zxIh48SZwVH2OvvRtbIUWzY9zXHHNxnCkom3lD%2Bdq90swNqk9wLIkzMrOGFF7JHvu3f%2Fx0cDj9z1%2F0HuXqcAPmeliZft%2B8OameOVDvYVRsceeyZj1Nq3JvA1G8AZ7wFtA5ZuRbcwPOCAz1qyyc%2ByTH6vm%2FL08GYMSrFJFGjEkSXwTzn4aY5RCm0lpoXFBhqFuVT3TZSPhOurJRpDMhqi2%2BWzrKO1sjPzOMAk3ra4v891bMvVZ5BrwXZ6WeuWW9d%2FjxUcxmrfDjQ2UShY5xYypdavQa9P1xI1gWC7tmNOInAWSSD7Gp5czMqL%2B0h4c1uRriSKF9j2YmD1dn73%2FNsZ7ny3MCKrcsDQnabeeER4q8MaY7CxMNvpOHfBHhZSHGwvAfxwotf07HihPYtNmSRQ3gFtX4LP4%2FHjsex3m1uYJV1ZlA9ruDJmL6FIMrtWvuCIoL%2BOiBkGtmr7A5IszT9vrWUe0wbmmWKW%2FBTJBOQyAprAW99oZ0osN17923TsbkHc3tFv1njFeOj4lWv5s%2FAzMkvMXoYOFtb2Itm%2FI3S064DMUd%2FAaiLFpb3tijM0V2aY76Q5hvGRuy790gOQVGyuCVeYuWYFe0DGm%2BkROu1wxu6XyHLymA%2Bg1J%2BdvbGw0AqTAKgI%3D"
const ScanQR = () => {
    const [qrCode, setQrCode] = useState("");
    const {data, error, isLoading, processInvoice} = useInvoiceProcessor();
    const [executed, setExecuted] = useState(false);
    return (<>
            <Button onClick={()=> {
                if(!executed) {
                    setExecuted(true);
                    setQrCode(url);
                    processInvoice(url).then(() => {
                        setQrCode('Done')
                    })
                    console.log(url);
                }
            }}>Manual create</Button>
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