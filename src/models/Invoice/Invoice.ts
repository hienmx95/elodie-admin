import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Currency } from 'models/Currency';
import { Expense } from 'models/Expense';

export class Invoice extends Model
{
    public id?: number;

    public expenseId?: number;

    public invoiceTypeId?: number;

    public supplierTaxCode?: string;

    public supplierName?: string;

    public supplierUpdate?: Moment;

    public content?: string;

    public description?: string;

    public createdDate?: Moment;

    public signs?: string;

    public number?: string;

    public seri?: string;

    public exchangeRate?: number;

    public exchangeTime?: Moment;

    public exchangeCurrencyId?: number;

    public mainCurrencyId?: number;

    public taxTypeId?: number;

    public taxAmount?: number;

    public subTotal?: number;

    public total?: number;

    public convertedTotal?: number;

    public converterdSubTotal?: number;

    public statusId?: number;




    public rowId?: string;


    public exchangeCurrency?: Currency;

    public expense?: Expense;

    public mainCurrency?: Currency;

}
