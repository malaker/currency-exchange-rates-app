import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currencyReducer from '../features/currency-exchange/currency/currencySlice';

export const store = configureStore({
  reducer: {
    currencies:currencyReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
