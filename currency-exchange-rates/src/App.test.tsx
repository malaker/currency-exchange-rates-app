import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { apiService } from './services/ExchangeCurrencyService';

test('Should render table A', async () => {
  await render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  let table = await apiService.getTableA();

  table.rates.forEach(async r => {
    await screen.findByText(r.code);
    let code = screen.getByText(r.code);
    expect(code).toBeInTheDocument();
  })

  var codeHeader = screen.getAllByText('Kod');
  var currencyHeader = screen.getAllByText('Waluta');
  var avgRateHeader = screen.getByText('Średni kurs [PLN]');

  codeHeader.forEach(ch => expect(ch).toBeInTheDocument());
  currencyHeader.forEach(ch => expect(ch).toBeInTheDocument());
  expect(avgRateHeader).toBeInTheDocument();


});


test('Should render chart', async () => {
  await render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  var buttons = await screen.findAllByRole('button');

  fireEvent(
    buttons[0],
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  let history = screen.getByText("Historia - średni kurs");
  expect(history).toBeInTheDocument();

});
