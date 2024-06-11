import {
    Bar,
    Button,
    Dialog, FlexBox,
    Input, Link, List,
    SegmentedButton,
    SegmentedButtonItem, StandardListItem, Text,
    Toolbar
} from "@ui5/webcomponents-react";
import React, {useState} from "react";
import QRCode from "react-qr-code";
import {SharedInvoice} from "../../interfaces/entities.tsx";

interface PaymentDialogProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    sharedInvoice: SharedInvoice
    paymentAmount: number
    setPaymentAmount: (paymentAmount: number) => void
}

const generateIPS = (accountNumber: string, name: string, amount: string): string => `K:PR|V:01|C:1|R:${accountNumber}|N:${name}|I:RSD${amount}|SF:289`

const generateIPSLinkYettel = (accountNumber: string, name: string, amount: string) =>
    `https://online.mobibanka.rs/ips/ek/fl/?data=${btoa(generateIPS(accountNumber, name, amount))}=&callback=https://sparesquare.xyz`


const PaymentDialog = ({isOpen, setIsOpen, paymentAmount, setPaymentAmount, sharedInvoice}: PaymentDialogProps) => {
    const [selectedSegment, setSelectedSegment] = useState('QR')
    const [editMode, setEditMode] = useState<boolean>(false)


    const renderQRCode = () => {
        console.log(  )
        return <FlexBox direction="Column" alignItems="Center" >
            {/*<QRCode style={{padding: "1rem 0"}} value={generateIPS(sharedInvoice.bankAccount.replace('-','').replace('-',''), sharedInvoice.userName, paymentAmount.toString().replace('.',','))  }/>*/}
            <QRCode style={{padding: "1rem 0"}} value={generateIPS(sharedInvoice.bankAccount.replace('-','').replace('-',''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',','').replace('.',','))  }/>
            <Text>Paying: {paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} RSD</Text>
            <Text>Paying to: {sharedInvoice.userName}</Text>
            <Text>Paying to account: {sharedInvoice.bankAccount}</Text>
        </FlexBox>
    }

    const renderBanksList = () => {
        return (
            <List>
                <StandardListItem> <Link
                    onClick={() => {
                        console.log('test 2:',generateIPSLinkYettel(sharedInvoice.bankAccount.replace('-','').replace('-',''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',','').replace('.',',')))
                    }}
                    href={generateIPSLinkYettel(sharedInvoice.bankAccount.replace('-','').replace('-',''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',','').replace('.',','))}>Yettel
                    Bank</Link></StandardListItem>
                <StandardListItem>Banca Intesa</StandardListItem>
                <StandardListItem>OTP Bank</StandardListItem>
                <StandardListItem>Addiko Bank</StandardListItem>
            </List>
        )
    }


    return (
        <Dialog
            open={isOpen}
            accessibleRole="AlertDialog"
            className="footerPartNoPadding"
            footer={
                <Bar design="Footer"
                     endContent={<Button onClick={() => {
                         setIsOpen(false)
                     }}>Close</Button>}/>}
            headerText="Select Payment method"
        >
            <Toolbar

            >
                <SegmentedButton>
                    <React.Fragment key=".0">
                        <SegmentedButtonItem pressed={selectedSegment === 'QR'} onClick={() => {
                            setSelectedSegment('QR')
                        }}>
                            IQS QR
                        </SegmentedButtonItem>
                        <SegmentedButtonItem pressed={selectedSegment === 'Bank'} onClick={() => {
                            setSelectedSegment('Bank')
                        }}>
                            Bank
                        </SegmentedButtonItem>
                    </React.Fragment>
                </SegmentedButton>
                {editMode ?
                    <Input style={{width: "150px"}} type="Number" value={paymentAmount.toString()}
                           onChange={(e) => setPaymentAmount(Number(e.target.value))}/>
                    : <Text>{paymentAmount}</Text>}
                <Text>RSD</Text>
                <Button icon={editMode ? "accept" : "edit"} onClick={() => {
                    setEditMode(!editMode)
                }}/>

            </Toolbar>
            {
                selectedSegment === 'QR' ? renderQRCode() : renderBanksList()
            }
        </Dialog>

    )
}

export default PaymentDialog;