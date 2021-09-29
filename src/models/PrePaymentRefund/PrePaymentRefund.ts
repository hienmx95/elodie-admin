import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Currency } from 'models/Currency';
import { PrePayment } from 'models/PrePayment';
import { Expense } from 'models/Expense';

export class PrePaymentRefund extends Model
{
    public id?: number;

    public prePaymentId?: number;

    public amount?: number;

    public refundExpenseId?: number;

    public exchangeRate?: number;

    public exchangeTime?: Moment;

    public exchangeCurrencyId?: number;

    public mainCurrencyId?: number;

    public convertedAmount?: number;




    public rowId?: string;


    public exchangeCurrency?: Currency;

    public mainCurrency?: Currency;

    public prePayment?: PrePayment;

    public refundExpense?: Expense;
}
