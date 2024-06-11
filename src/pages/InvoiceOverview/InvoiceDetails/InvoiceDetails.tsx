import {
    Button,
    DynamicPageHeader,
    FlexBox,
    ObjectPage,
    DynamicPageTitle,
    Label,
    Text,
    Avatar, Title, List, StandardListItem
} from "@ui5/webcomponents-react";
import {Invoice} from "../../../interfaces/entities.tsx";
import {useNavigate} from "react-router-dom";
import {shareInvoice} from "../../../services/Invoices.tsx";
import {useCurrentUser} from "../../../auth/AuthProvider.tsx";

interface InvoiceDetailsProps {
    invoice: Invoice
    setEditMode: (editMode: boolean) => void
}

const InvoiceDetails = ({invoice, setEditMode}: InvoiceDetailsProps) => {
    const navigate = useNavigate()
    const {user} = useCurrentUser()
    return (
        <ObjectPage
            headerContent={<DynamicPageHeader>
                <FlexBox justifyContent="SpaceBetween" alignItems="Center">
                <FlexBox direction="Column">
                    <Title level="H5"
                           style={{marginBottom: "0.5rem"}}>{invoice.totalAmount.toLocaleString()} RSD</Title>
                    <Label>{invoice.address}</Label>
                    <Label>{invoice.dateTime.toDate().toLocaleString()}</Label>
                </FlexBox>
                    <FlexBox>
                        <Button design="Transparent" onClick={() => {
                            console.log(invoice.id, user?.uid)
                            shareInvoice(invoice.id, user!.uid).then(()=> {
                                console.log("Invoice shared")
                                navigate(`/shared/${invoice.id}`)
                            })
                        }} icon='action'>Share</Button>
                    </FlexBox>
                </FlexBox>
            </DynamicPageHeader>}
            headerContentPinnable
            headerTitle={<DynamicPageTitle
                actions={<>
                    <Button design="Transparent" onClick={() => {
                        setEditMode(true)
                    }}>Edit</Button>
                    <Button design="Transparent" onClick={() => {
                        navigate(-1)
                    }} icon='decline'/>
                </>}
                header={<Title level="H3">{invoice.shopFullName}</Title>}
                showSubHeaderRight
            ></DynamicPageTitle>}
            image={<Avatar icon="retail-store"/>}
            imageShapeCircle
            selectedSectionId="goals"
            showHideHeaderButton
        >
            <List>
                {invoice.items?.map((item) => {
                    return (<StandardListItem
                        key={item.id}
                        description={`kol. ${item.amount} x ${item.priceWithVat} RSD`}
                    >
                        <FlexBox justifyContent="SpaceBetween">
                            <Text>{item.name}</Text>
                            <Text>{item.totalPrice.toLocaleString()} RSD</Text>
                        </FlexBox>
                    </StandardListItem>)
                })}
            </List>
        </ObjectPage>
    )
}

export default InvoiceDetails;