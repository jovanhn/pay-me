import InvoicesList from "../../components/Invoices/InvoicesList.tsx";
import {Button} from "@ui5/webcomponents-react";
import {useState} from "react";

const initialDateState = (): Date => {
    const currentMonth = new Date();
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)
    console.log(currentMonth)
    return currentMonth;
}

const Home = () => {
    const [date, setDate] = useState<Date>(initialDateState());
    return (
        <>
            <div>
                <Button icon="navigation-left-arrow" onClick={() => {
                    const newDate = new Date(date)
                    newDate.setMonth(date.getMonth() - 1)
                    setDate(newDate);
                }}/>
                <div>{date.toLocaleDateString('en-us', {month: "long", year: "numeric"})}</div>
                <Button icon="navigation-right-arrow" onClick={() => {
                    const newDate = new Date(date)
                    newDate.setMonth(date.getMonth() + 1)
                    setDate(newDate);
                }}/>
            </div>
            <InvoicesList date={date}/>
        </>
    )
}

export default Home