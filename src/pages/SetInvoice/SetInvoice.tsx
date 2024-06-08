import {
    Bar,
    Button,
    Form,
    FormGroup,
    FormItem,
    Option,
    Input,
    Label,
    Select,
    Switch,
    TextArea,
    Ui5CustomEvent,
    InputDomRef,
    SelectDomRef,
    SwitchDomRef,
    DateTimePicker,
} from "@ui5/webcomponents-react"
import {useState} from "react";
import {Invoice} from "../../interfaces/entities.tsx";
import {Timestamp, deleteDoc, doc} from "firebase/firestore";
import {SelectChangeEventDetail} from "@ui5/webcomponents/dist/Select.js";
import {saveInvoice} from "../../services/Invoices.tsx";
import {auth, db} from "../../firebase.tsx";
import {useNavigate} from "react-router-dom";

export interface CreateInvoiceProps {
    oldInvoice?: Invoice
    editMode?: boolean
}

const CreateInvoicePage = ({oldInvoice, editMode}: CreateInvoiceProps) => {
    const userId = auth.currentUser?.uid
    const [invoice, setInvoice] = useState<Invoice>(
        oldInvoice ?? {
            id: crypto.randomUUID(),
            shopFullName: '',
            address: '',
            dateTime: Timestamp.fromDate(new Date()),
            totalAmount: 0,
            currency: 'RSD',
            invoiceNumber: '',
            type: 'manual',
            items: []
        })
    const [customDateDisabled, setCustomDateDisabled] = useState(true)

    const navigate = useNavigate();

    const handleDelete = () => {
        void deleteDoc(doc(db, `data/invoices/${userId}`, invoice.id)).then(() => {
            console.log("Invoice deleted");
            navigate('/')
        })
    }


    const handleCurrencySelectChange = (e: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const updatedInvoice = {...invoice}
        updatedInvoice.currency = e.target.value
        setInvoice(updatedInvoice)
    }

    const handleFormInputChange = (e: Ui5CustomEvent<InputDomRef>) => {
        const updatedInvoice = {...invoice, [e.target.name]: e.target.value}
        setInvoice(updatedInvoice)
    }

    const handleFormInputChangeNumeric = (e: Ui5CustomEvent<InputDomRef>) => {
        const updatedInvoice = {...invoice, [e.target.name]: parseFloat(e.target.value)}
        setInvoice(updatedInvoice)
    }

    const handleMark = (e: Ui5CustomEvent<SwitchDomRef>) => {
        const updatedInvoice = {...invoice, [e.target.name]: e.target.checked}
        setInvoice(updatedInvoice)
    }


    return (
        <>
            <Form
                columnsL={1}
                columnsM={1}
                columnsS={1}
                columnsXL={2}
                labelSpanL={4}
                labelSpanM={2}
                labelSpanS={12}
                labelSpanXL={4}
                style={{
                    alignItems: 'center'
                }}
                titleText="Invoice details"
            >
                <FormGroup>
                    <FormItem label="Expense Name">
                        <Input
                            name="shopFullName"
                            type="Text"
                            value={invoice.shopFullName}
                            placeholder="Maxi or Airplane tickets for Barcelona..."
                            onChange={(e) => handleFormInputChange(e)}/>
                    </FormItem>
                    <FormItem label={<Label>Price</Label>}>
                        <Input
                            name="totalAmount"
                            type="Number"
                            placeholder="1245.45"
                            value={invoice.totalAmount.toString()}
                            onInput={(e) => handleFormInputChangeNumeric(e)}/>
                        <Select
                            style={{width: '3.2rem'}}
                            value={invoice.currency}
                            onChange={(e) => handleCurrencySelectChange(e)}>
                            <Option>RSD</Option>
                            <Option>€</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="Custom date">
                        <Switch name="customDateMark" onChange={(e => {
                            setCustomDateDisabled(!e.target.checked)
                        })}/>
                        <DateTimePicker disabled={customDateDisabled} value={invoice.dateTime.toDate().toString()}
                                        onChange={(e) => {
                                            setInvoice({
                                                ...invoice,
                                                dateTime: Timestamp.fromDate(new Date(e.target.value))
                                            })
                                        }}/>
                    </FormItem>

                    <FormItem
                        label={<Label style={{alignSelf: 'start', paddingTop: '0.25rem'}}>Additional Comment</Label>}>
                        <TextArea
                            placeholder="Some description or additional comment'"
                            rows={5}
                        />
                    </FormItem>
                    <FormItem label="Mark">
                        <Switch name="marked" checked={invoice.marked} onChange={(e) => handleMark(e)}/>
                    </FormItem>
                </FormGroup>
            </Form>
            {editMode &&
                <Button
                    onClick={() => handleDelete()}
                    design="Negative"
                    icon="delete"
                    style={{marginBottom: "1rem"}}>Delete invoice</Button>
            }
            <Bar design="FloatingFooter"
                 endContent={<>
                     <Button disabled={(invoice.shopFullName === '' || invoice.totalAmount === 0)}
                             design="Emphasized" onClick={() => {
                         if (auth.currentUser) {
                             saveInvoice(auth.currentUser, invoice).then(() => {
                                 navigate('/')
                             })
                         }
                     }}>Save</Button>
                     <Button
                         onClick={() => {
                             navigate(-1)
                         }}
                         design="Transparent">
                         Cancel
                     </Button></>}/>

        </>
    )
}

export default CreateInvoicePage