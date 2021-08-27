import { useState, useEffect } from 'react';
import { apiService } from '../../services/ExchangeCurrencyService';
import { CurrencyExchangeTable, emptyTable } from '../../services/CurrencyExchangeTable';

export function useTableExchangeCurencies() {
    const [table, setTable] = useState<CurrencyExchangeTable>(emptyTable);

    useEffect(() => {
            apiService.getTableA().then(data => setTable(data));
    },[]);

    return [table];
}