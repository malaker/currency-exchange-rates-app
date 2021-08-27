import { Button, Table } from "react-bootstrap";
import { RiLineChartFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeFromHistory, selectCurrencies, setFromDate } from "./currency/currencySlice";
import { CgPlayListRemove } from 'react-icons/cg';
import { useEffect, useState } from "react";
import { apiService } from "../../services/ExchangeCurrencyService";
import { CurrencyExchangeTable } from "../../services/CurrencyExchangeTable";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function CurrencyHistory() {

    const chosenCurrencies = useAppSelector(selectCurrencies);
    const [tables, setTables] = useState<Array<CurrencyExchangeTable>>(new Array<CurrencyExchangeTable>());

    useEffect(() => {

        apiService.getCurrencyDataByPeriod(new Date(Date.parse(chosenCurrencies.from)), new Date(Date.parse(chosenCurrencies.to)), chosenCurrencies.currencies.map(c => c.currencyCode))
            .then(data => setTables(data));

    }, [chosenCurrencies.currencies, chosenCurrencies.from]);

    if (chosenCurrencies.currencies.length > 0) {
        return (
            <div>
                <CurrencyHistoryPeriods />
                <CustomLineChart data={tables}></CustomLineChart>
                <ChosenCurrencies />
            </div>
        )
    }
    return <div><span style={{ marginRight: 5 }}>Pick some currencies from the left by clicking</span><RiLineChartFill /></div>
}

function CurrencyHistoryPeriods() {
    const dispatch = useAppDispatch();

    return (
        <div>
            <Button variant="primary" onClick={() => dispatch(setFromDate(7))}>Tydzień</Button>
            <Button variant="primary" onClick={() => dispatch(setFromDate(30))}>Miesiąc</Button>
            <Button variant="primary" onClick={() => dispatch(setFromDate(365))}>Rok</Button>
        </div>)
}

function ChosenCurrencies() {

    const chosenCurrencies = useAppSelector(selectCurrencies);
    const dispatch = useAppDispatch();

    if (chosenCurrencies.currencies.length > 0) {
        return (<Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Kod</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {chosenCurrencies.currencies.map(c =>
                    <tr key={c.currencyCode}>
                        <td>{c.currencyCode}</td>
                        <td><Button onClick={() => dispatch(removeFromHistory(c.currencyCode))}><CgPlayListRemove /></Button></td>
                    </tr>)}
            </tbody>
        </Table>)
    }
    return null;
}

interface CurrencyChartData {
    data: Array<CurrencyExchangeTable>;
}


function CustomLineChart(props: CurrencyChartData) {

    var tables = props.data;

    return (
        <div style={{ width: 500, height: 500, marginTop: 15, marginBottom: 40 }}>
            <h3>Historia - średni kurs</h3>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={300}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <Tooltip/>
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" type="category" allowDuplicatedCategory={false} />
                    <YAxis domain={['dataMin-0.2', 'dataMax+0.2']} tickFormatter={tick => { return Number.parseFloat(tick).toFixed(2);}} />
                    
                    {tables.map((t) => (
                        <Line dataKey="mid" data={t.rates} name={t.currency} key={t.code} />
                    ))}

                </ComposedChart>
            </ResponsiveContainer>
        </div>);
}