import {
    Avatar,
    Button,
    DynamicPageHeader,
    DynamicPageTitle,
    FlexBox,
    Label, List,
    Loader,
    ObjectPage, StandardListItem,
    Text,
    Title
} from "@ui5/webcomponents-react";
import {useParams} from "react-router-dom";
import {useSharedInvoice} from "../../services/Invoices.tsx";
import {useState} from "react";

const SharedInvoice = () => {
    const {invoiceId} = useParams();
    console.log(invoiceId);
    const {isLoading, isError, sharedInvoice} = useSharedInvoice(invoiceId!);
    const [selectedSum, setSelectedSum] = useState<number>(0.0);

    // get shared invoice
    // shard invoice except the invoice data needs to have bank data of the invoice creator, at least name and
    // bank number

    // render details page with ability to select one multiple or all items
    // generate QR code or redirect to a bank
    if (isLoading) {
        return <Loader/>
    }

    if (isError) {
        return <Text>{invoiceId} Does not exists</Text>;
    }

    if (sharedInvoice) {
        return (
            <ObjectPage
                headerContent={<DynamicPageHeader>
                    <FlexBox justifyContent="SpaceBetween" alignItems="Center">
                        <FlexBox direction="Column">
                            <Title level="H5"
                                   style={{marginBottom: "0.5rem"}}>{sharedInvoice.totalAmount.toLocaleString()} RSD</Title>
                            <Label>{sharedInvoice.address}</Label>
                            <Label>{sharedInvoice.dateTime.toDate().toLocaleString()}</Label>
                        </FlexBox>
                        <FlexBox direction="Column" alignItems="Baseline">
                            <Button design="Transparent" onClick={() => {

                            }} icon='currency'>Pay all</Button>
                            <Button design="Transparent" onClick={() => {
                                //
                            }} icon='money-bills'>Pay {selectedSum.toLocaleString()}</Button>
                            <Button design="Transparent" onClick={() => {
                                window.location.reload();
                            }} icon='cancel'>Reset</Button>
                        </FlexBox>
                    </FlexBox>
                </DynamicPageHeader>}
                headerContentPinnable
                headerTitle={<DynamicPageTitle
                    actions={<>

                        <Button design="Transparent" onClick={() => {

                        }} icon='decline'/>
                    </>}
                    header={<Title level="H3">{sharedInvoice.shopFullName}</Title>}
                    showSubHeaderRight
                ></DynamicPageTitle>}
                image={<Avatar icon="retail-store"/>}
                imageShapeCircle
                selectedSectionId="goals"
                showHideHeaderButton
            >
                <List mode="MultiSelect"
                      onItemClick={(e) => {
                          const id = e.detail.item.attributes.getNamedItem('data-id')!.value
                          const selected = e.detail.item.selected
                          console.log(selected)
                          const value = String(sharedInvoice?.items.find((item) => item.id === id)!.totalPrice).replace(',', '.')
                          setSelectedSum(selectedSum + (selected ? Number(value) : -Number(value)))
                      }}>
                    {sharedInvoice.items?.map((item) => {
                        return (<StandardListItem
                            data-id={item.id}
                            key={item.id}
                            description={`kol. ${item.amount} x ${item.priceWithVat} RSD`}
                            onClick={() => {

                            }}

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

}

export default SharedInvoice;