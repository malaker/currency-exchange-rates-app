import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface CurrenciesHistoryState {
  from: string;
  to: string;
  currencies: Array<CurrencyHistoryState>
}

export interface CurrencyHistoryState {
  currencyCode: string;
}

const initialState: CurrenciesHistoryState = {
  to: new Date(Date.now()).toISOString(),
  from: new Date(Date.now() - (7 * 24 * 3600000)).toISOString(),
  currencies: new Array<CurrencyHistoryState>()
};

export interface ICurrencyServicePayload {
  from: Date; to: Date; currencyCode: string;
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<string>) => {
      if(!state.currencies.find(c=>c.currencyCode===action.payload))
      {
        state.currencies.push({ currencyCode: action.payload});
      }
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      let idx=state.currencies.findIndex(c=>c.currencyCode===action.payload)
      if(idx>=0)
      {
        state.currencies.splice(idx,1);
      }
    },
    setFromDate:  (state, action: PayloadAction<number>) => {
      state.from = new Date(Date.now() - (action.payload * 24 * 3600000)).toISOString()
    }
  }
});

export const { addToHistory, removeFromHistory, setFromDate } = currencySlice.actions;

export const selectCurrencies = (state: RootState) => state.currencies;

export default currencySlice.reducer;
