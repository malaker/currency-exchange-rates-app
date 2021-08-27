export class CurrencyExchangeTable
{
    public table!:string;
    public code?:string;
    public no?:string;
    public rates!:Array<Rate>;
    public effectiveDate?:string;
    public currency?: string;
}
export interface Rate{
    currency?: string;
    code:string;
    mid:number;
    no?:string;
    effectiveDate?:string;
}

export var emptyTable = new CurrencyExchangeTable();
emptyTable.effectiveDate='';
emptyTable.no='';
emptyTable.table='';
emptyTable.rates = new Array<Rate>();