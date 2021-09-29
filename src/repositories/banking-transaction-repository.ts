import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_BANKING_TRANSACTION_PREFIX } from "config/api-consts";
import { BankingTransaction, BankingTransactionFilter } from 'models/BankingTransaction';
import { BankingTransactionStatus, BankingTransactionStatusFilter } from 'models/BankingTransactionStatus';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Expense, ExpenseFilter } from 'models/Expense';

export class BankingTransactionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_BANKING_TRANSACTION_PREFIX);
    }

    public count = (bankingTransactionFilter?: BankingTransactionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), bankingTransactionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (bankingTransactionFilter?: BankingTransactionFilter): Observable<BankingTransaction[]> => {
        return this.httpObservable.post<BankingTransaction[]>(kebabCase(nameof(this.list)), bankingTransactionFilter)
            .pipe(map((response: AxiosResponse<BankingTransaction[]>) => response.data));
    };

    public get = (id: number | string): Observable<BankingTransaction> => {
        return this.httpObservable.post<BankingTransaction>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<BankingTransaction>) => response.data));
    };

    public create = (bankingTransaction: BankingTransaction): Observable<BankingTransaction> => {
        return this.httpObservable.post<BankingTransaction>(kebabCase(nameof(this.create)), bankingTransaction)
            .pipe(map((response: AxiosResponse<BankingTransaction>) => response.data));
    };

    public update = (bankingTransaction: BankingTransaction): Observable<BankingTransaction> => {
        return this.httpObservable.post<BankingTransaction>(kebabCase(nameof(this.update)), bankingTransaction)
            .pipe(map((response: AxiosResponse<BankingTransaction>) => response.data));
    };

    public delete = (bankingTransaction: BankingTransaction): Observable<BankingTransaction> => {
        return this.httpObservable.post<BankingTransaction>(kebabCase(nameof(this.delete)), bankingTransaction)
            .pipe(map((response: AxiosResponse<BankingTransaction>) => response.data));
    };

    public save = (bankingTransaction: BankingTransaction): Observable<BankingTransaction> => {
        return bankingTransaction.id ? this.update(bankingTransaction) : this.create(bankingTransaction);
    };

    public singleListBankingTransactionStatus = (): Observable<BankingTransactionStatus[]> => {
        return this.httpObservable.post<BankingTransactionStatus[]>(kebabCase(nameof(this.singleListBankingTransactionStatus)), new BankingTransactionStatusFilter())
            .pipe(map((response: AxiosResponse<BankingTransactionStatus[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListExpense = (expenseFilter: ExpenseFilter): Observable<Expense[]> => {
        return this.httpObservable.post<Expense[]>(kebabCase(nameof(this.singleListExpense)), expenseFilter)
            .pipe(map((response: AxiosResponse<Expense[]>) => response.data));
    };
    

    public bulkDelete = (idList: number[] | string[]): Observable<void> => {
        return this.httpObservable.post(kebabCase(nameof(this.bulkDelete)), idList)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public import = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.import)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public export = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export', filter, {
          responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const bankingTransactionRepository = new BankingTransactionRepository();
