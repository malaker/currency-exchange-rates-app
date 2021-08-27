import React from 'react';
import { Rate } from '../../services/CurrencyExchangeTable';
import { RiLineChartFill } from 'react-icons/ri';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { addToHistory } from './currency/currencySlice';

export interface ICurrencyTableRowProps {
    rate: Rate;
}

export function CurrencyTableRow(props: ICurrencyTableRowProps) {
    const dispatch = useAppDispatch();
    return (<tr>
        <td>{props.rate.code}</td>
        <td>{props.rate.currency}</td>
        <td>{props.rate.mid}</td>
        <td>
            <Button onClick={() =>  dispatch(addToHistory(props.rate.code))}><RiLineChartFill /></Button>
        </td>
    </tr>)
}