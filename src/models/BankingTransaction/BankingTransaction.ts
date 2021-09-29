import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { BankingTransactionStatus } from 'models/BankingTransactionStatus';
import { Currency } from 'models/Currency';
import { Expense } from 'models/Expense';

export class BankingTransaction extends Model
{
    public id?: number;

    public expenseId?: number;

    public bankCreditAccountId?: number;

    public bankDebitAccountId?: number;

    public exchangeRate?: number;

    public exchangeTime?: Moment;

    public exchangeCurrencyId?: number;

    public mainCurrencyId?: number;

    public bankingTransactionStatusId?: number;

    public amount?: number;

    public error?: string;

    public chargeable?: boolean;




    public rowId?: string;


    public bankingTransactionStatus?: BankingTransactionStatus;

    public exchangeCurrency?: Currency;

    public expense?: Expense;

    public mainCurrency?: Currency;
}
