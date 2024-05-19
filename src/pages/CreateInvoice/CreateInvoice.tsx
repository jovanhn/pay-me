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
    TextArea, Ui5CustomEvent, InputDomRef, SelectDomRef, SwitchDomRef, DateTimePicker
} from "@ui5/webcomponents-react"
import {useState} from "react";
import {Invoice} from "../../interfaces/entities.tsx";
import {Timestamp} from "firebase/firestore";
import {SelectChangeEventDetail} from "@ui5/webcomponents/dist/Select.js";
import {createInvoice} from "../../services/Invoices.tsx";
import {auth} from "../../firebase.tsx";
import {useNavigate} from "react-router-dom";


const CreateInvoicePage = () => {
    const [invoice, setInvoice] = useState<Invoice>(
        {
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
        console.log(invoice)
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
                titleText="Create new invoice"
            >
                <FormGroup titleText="Main information">
                    <FormItem label="Name">
                        <Input
                            name="shopFullName"
                            type="Text"
                            placeholder="Maxi or Airplane tickets for Barcelona..."
                            onChange={(e) => handleFormInputChange(e)}/>
                    </FormItem>
                    <FormItem label={<Label>Price</Label>}>
                        <Input
                            name="totalAmount"
                            type="Number"
                            placeholder="1245.45"
                            onInput={(e) => handleFormInputChangeNumeric(e)}/>
                        <Select value={invoice.currency} onChange={(e) => handleCurrencySelectChange(e)}>
                            <Option>RSD</Option>
                            <Option>€</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="Custom date">
                        <Switch name="marked" onChange={(e=>{
                            setCustomDateDisabled(!e.target.checked)
                        })}/>
                        <DateTimePicker disabled={customDateDisabled} value={invoice.dateTime.toDate().toString()}
                               onChange={(e) => {
                                   console.log(e.target.value)
                                   setInvoice({...invoice, dateTime: Timestamp.fromDate(new Date(e.target.value))})
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
                        <Switch name="marked" onChange={(e) => handleMark(e)}/>
                    </FormItem>
                </FormGroup>
            </Form>
            <Bar design="FloatingFooter"
                 endContent={<>
                     <Button disabled={(invoice.shopFullName === '' || invoice.totalAmount === 0)}
                             design="Emphasized" onClick={() => {
                         if (auth.currentUser) {
                             createInvoice(auth.currentUser, invoice).then(() => {
                                 navigate('/')
                             })
                         }
                         console.log(invoice)
                     }}>Create</Button>
                     <Button
                         onClick={() => {
                             navigate('/')
                         }}
                         design="Transparent">
                         Cancel
                     </Button></>}/>

        </>
    )
}

export default CreateInvoicePage