import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { AdvancePayment } from 'models/AdvancePayment';
import { Currency } from 'models/Currency';
import { Expense } from 'models/Expense';

export class AdvancePaymentRefund extends Model
{
    public id?: number;

    public advancePaymentId?: number;

    public amount?: number;

    public refundExpenseId?: number;

    public exchangeRate?: number;

    public exchangeTime?: Moment;

    public exchangeCurrencyId?: number;

    public mainCurrencyId?: number;

    public convertedAmount?: number;




    public rowId?: string;


    public advancePayment?: AdvancePayment;

    public exchangeCurrency?: Currency;

    public mainCurrency?: Currency;

    public refundExpense?: Expense;
}
