import React from 'react';
import { Table } from 'react-bootstrap';
import { useTableExchangeCurencies } from './hooks';
import {CurrencyTableRow} from './CurrencyTableRow';

export function CurrenciesTable() {
    const [tableData] = useTableExchangeCurencies();
    return (<div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Kod</th>
                    <th>Waluta</th>
                    <th>Średni kurs [PLN]</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.rates.map(r => <CurrencyTableRow key={r.code} rate={r}/>)}
            </tbody>
        </Table>
    </div>)
}