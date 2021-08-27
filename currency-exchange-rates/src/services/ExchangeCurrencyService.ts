import axios, { AxiosResponse } from "axios";
import { formatDate } from "../Utilities/dateHelpers";
import { Rate, CurrencyExchangeTable } from "./CurrencyExchangeTable";

export class ExchangeCurrencyService {
  async getTableA(): Promise<CurrencyExchangeTable> {
    let tables: AxiosResponse<CurrencyExchangeTable[]> = await httpService.get<CurrencyExchangeTable[]>('/tables/a');
    return tables.data[0];
  }

  async getCurrencyDataByPeriod(from: Date, to: Date, currencyCodes: Array<string>): Promise<Array<CurrencyExchangeTable>> {

    if (currencyCodes.length > 0) {
      var responses: Array<CurrencyExchangeTable> = [];
      for (var i = 0; i < currencyCodes.length; i++) {
        let tables: AxiosResponse<CurrencyExchangeTable> = await httpService.get<CurrencyExchangeTable>(`/rates/a/${currencyCodes[i]}/${formatDate(from)}/${formatDate(to)}/?format=json`);
        var rates = tables.data.rates.map<Rate>(r => {
          return {
            currency: tables.data.currency,
            code: tables.data.code!,
            mid: r.mid,
            no: r.no,
            effectiveDate: r.effectiveDate
          }
        });
        var ratesTable = new CurrencyExchangeTable();
        ratesTable.currency = tables.data.currency;
        ratesTable.code = tables.data.code;
        ratesTable.rates = rates;
        responses.push(ratesTable);
      }

      return responses;
    }
    return new Array<CurrencyExchangeTable>();
  }
}

export var apiService = new ExchangeCurrencyService();

export var httpService = axios.create({
  baseURL: "https://api.nbp.pl/api/exchangerates/",
  headers: {
    "Content-type": "application/json"
  }
});
