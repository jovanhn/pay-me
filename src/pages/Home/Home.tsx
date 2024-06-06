import InvoicesList from "../../components/Invoices/InvoicesList.tsx";
import {Button, FlexBox, Title} from "@ui5/webcomponents-react";
import { useState} from "react";
import {useNavigate} from "react-router-dom";

const initialDateState = (): Date => {
    const currentMonth = new Date();
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)
    return currentMonth;
}

const Home = () => {
    const [date, setDate] = useState<Date>(initialDateState());
    const [monthExpenses, setMonthExpenses] = useState<number>(0);
    const navigate = useNavigate();

    return (
        <>
            <FlexBox alignItems="Center" justifyContent="SpaceBetween">
                <Button
                    icon="navigation-left-arrow"
                    design="Transparent"
                    style={{height: "4rem", width: "4rem"}}
                    onClick={() => {
                        const newDate = new Date(date)
                        newDate.setMonth(date.getMonth() - 1)
                        setDate(newDate);
                    }}/>
                <FlexBox direction="Column" style={{padding: "0 3rem"}} alignItems="Center">
                    <Title level="H3">{date.toLocaleDateString('en-us', {month: "long", year: "numeric"})}</Title>
                    <Title level="H3">{monthExpenses.toLocaleString()} RSD</Title>
                </FlexBox>
                <Button
                    icon="navigation-right-arrow"
                    style={{height: "4rem", width: "4rem"}}
                    design="Transparent"
                    onClick={() => {
                        const newDate = new Date(date)
                        newDate.setMonth(date.getMonth() + 1)
                        setDate(newDate);
                    }}/>
            </FlexBox>
            <FlexBox alignItems="Center" justifyContent="SpaceBetween" style={{padding: "0 1rem"}}>
            <Button
                style={{margin: "1rem 0", width: "8rem"}}
                icon="add-activity"
                onClick={() => {
                navigate('/new-invoice')

            }}>Manual input</Button>
            <Button
                style={{margin: "1rem 0", width: "8rem"}}
                icon="qr-code"
                onClick={() => {
                    navigate('/scan-qr')
                }}>Scan</Button>
            </FlexBox>
            <InvoicesList date={date} setMonthExpenses={setMonthExpenses}/>
        </>
    )
}

export default Home