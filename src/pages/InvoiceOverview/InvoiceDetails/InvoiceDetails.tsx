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

interface InvoiceDetailsProps {
    invoice: Invoice
    setEditMode: (editMode: boolean) => void
}

const InvoiceDetails = ({invoice, setEditMode}: InvoiceDetailsProps) => {
    const navigate = useNavigate()
    return (
        <ObjectPage
            headerContent={<DynamicPageHeader>
                <FlexBox direction="Column">
                    <Title level="H3">{invoice.shopFullName}</Title>
                    <Title level="H5"
                           style={{marginBottom: "0.5rem"}}>{invoice.totalAmount.toLocaleString()} RSD</Title>
                    <Label>{invoice.address}</Label>
                    <Label>{invoice.dateTime.toDate().toLocaleString()}</Label>
                </FlexBox>
            </DynamicPageHeader>}
            headerContentPinnable
            headerTitle={<DynamicPageTitle
                actions={<><Button design="Transparent" onClick={()=> {setEditMode(true)}}>Edit</Button></>}
                header={<><FlexBox alignItems="Center"><Button icon="arrow-left" design="Transparent" onClick={()=> navigate(-1)}/><Title level="H4">Back</Title></FlexBox></>} showSubHeaderRight
            ></DynamicPageTitle>}
            image={<Avatar icon="retail-store"/>}
            imageShapeCircle
            selectedSectionId="goals"
            showHideHeaderButton
            style={{
                height: '700px'
            }}
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