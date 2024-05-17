import {Bar, Button, Form, FormGroup, FormItem, Option, Input, Label, Select, Switch, TextArea} from "@ui5/webcomponents-react"


const CreateInvoicePage = () => {
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
                        <Input type="Text"/>
                    </FormItem>
                    <FormItem label="Currency">
                    <Select defaultValue="€">
                        <Option>€</Option>
                        <Option>RSD</Option>
                    </Select>
                    </FormItem>
                    <FormItem label={<Label>Price</Label>}>
                        <Input type="Number"/>
                    </FormItem>

                    <FormItem
                        label={<Label style={{alignSelf: 'start', paddingTop: '0.25rem'}}>Additional Comment</Label>}>
                        <TextArea
                            placeholder="Some description or additional comment'"
                            rows={5}
                        />
                    </FormItem>
                    <FormItem label="Mark as important">
                        <Switch/>
                    </FormItem>
                </FormGroup>
            </Form>
            <Bar design="FloatingFooter"
                 endContent={<><Button design="Emphasized" >Create</Button><Button design="Transparent">Cancel</Button></>}/>

        </>
    )
}

export default CreateInvoicePage