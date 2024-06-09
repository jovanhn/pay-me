import {
    Button,
    DynamicPageHeader,
    FlexBox,
    ObjectPage,
    DynamicPageTitle,
    Label,
    Text,
    Avatar, Title, List, StandardListItem, Bar, Link
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
            // TODO: Remove line below
            footer={<><Bar><Link href={"https://online.mobibanka.rs/ips/ek/fl/?data=SzpQUnxWOjAxfEM6MXxSOjExNTAzODE2MzgxNzgxODYzNHxOOkpvdmFuIFN1YmVyaWN8STpSU0QxMDAsMXxTRjoyODk=&callback=https://sparesquare.xyz"}> Pay</Link></Bar></>}
            headerContent={<DynamicPageHeader>
                <FlexBox direction="Column">
                    <Title level="H5"
                           style={{marginBottom: "0.5rem"}}>{invoice.totalAmount.toLocaleString()} RSD</Title>
                    <Label>{invoice.address}</Label>
                    <Label>{invoice.dateTime.toDate().toLocaleString()}</Label>
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
            style={{
                height: '700px'
            }}
        >
            <List mode="MultiSelect">
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