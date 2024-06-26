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

const generateIPSLink = (bankUrl: string, accountNumber: string, name: string, amount: string) =>
    `https://${bankUrl}/ips/ek/fl/?data=${btoa(generateIPS(accountNumber, name, amount))}&callback=https://sparesquare.xyz`

const yettelBank = 'online.mobibanka.rs'
const intesaBank = 'ipspos.bancaintesa.rs'
const aikBank = 'ebanking.aikbanka.rs'
const otpBank = 'ebank.otpbanka.rs'

const PaymentDialog = ({isOpen, setIsOpen, paymentAmount, setPaymentAmount, sharedInvoice}: PaymentDialogProps) => {
    const [selectedSegment, setSelectedSegment] = useState('QR')
    const [editMode, setEditMode] = useState<boolean>(false)


    const renderQRCode = () => {
        console.log()
        return <FlexBox direction="Column" alignItems="Center">
            {/*<QRCode style={{padding: "1rem 0"}} value={generateIPS(sharedInvoice.bankAccount.replace('-','').replace('-',''), sharedInvoice.userName, paymentAmount.toString().replace('.',','))  }/>*/}
            <QRCode style={{padding: "1rem 0"}}
                    value={generateIPS(sharedInvoice.bankAccount.replace('-', '').replace('-', ''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',', '').replace('.', ','))}/>
            <Text>Paying: {paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} RSD</Text>
            <Text>Paying to: {sharedInvoice.userName}</Text>
            <Text>Paying to account: {sharedInvoice.bankAccount}</Text>
        </FlexBox>
    }

    const renderBanksList = () => {
        return (
            <List>
                <StandardListItem>
                    <Link
                        href={generateIPSLink(yettelBank, sharedInvoice.bankAccount.replace('-', '').replace('-', ''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',', '').replace('.', ','))}>
                        Yettel Bank</Link></StandardListItem>
                <StandardListItem>
                    <Link
                        href={generateIPSLink(intesaBank, sharedInvoice.bankAccount.replace('-', '').replace('-', ''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',', '').replace('.', ','))}>
                        Banka Intesa</Link></StandardListItem>
                <StandardListItem>
                    <Link
                        href={generateIPSLink(aikBank, sharedInvoice.bankAccount.replace('-', '').replace('-', ''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',', '').replace('.', ','))}>
                        Aik Banka</Link></StandardListItem>
                <StandardListItem>
                    <Link
                        href={generateIPSLink(otpBank, sharedInvoice.bankAccount.replace('-', '').replace('-', ''), sharedInvoice.userName, paymentAmount.toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',', '').replace('.', ','))}>
                        OTP Banka
                    </Link></StandardListItem>
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


            </Toolbar>
            {editMode ?
                <Input style={{width: "150px"}} type="Number" value={paymentAmount.toLocaleString()}
                       onChange={(e) => setPaymentAmount(Number(e.target.value))}/>
                : <Text>Paying: {paymentAmount.toLocaleString()}</Text>}
            <Text style={{marginRight: "1rem"}}>RSD</Text>
            <Button icon={editMode ? "accept" : "edit"} onClick={() => {
                setEditMode(!editMode)
            }}/>
            {
                selectedSegment === 'QR' ? renderQRCode() : renderBanksList()
            }
        </Dialog>

    )
}

export default PaymentDialog;