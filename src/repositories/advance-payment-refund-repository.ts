import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ADVANCE_PAYMENT_REFUND_PREFIX } from "config/api-consts";
import { AdvancePaymentRefund, AdvancePaymentRefundFilter } from 'models/AdvancePaymentRefund';
import { AdvancePayment, AdvancePaymentFilter } from 'models/AdvancePayment';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Expense, ExpenseFilter } from 'models/Expense';

export class AdvancePaymentRefundRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ADVANCE_PAYMENT_REFUND_PREFIX);
    }

    public count = (advancePaymentRefundFilter?: AdvancePaymentRefundFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), advancePaymentRefundFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (advancePaymentRefundFilter?: AdvancePaymentRefundFilter): Observable<AdvancePaymentRefund[]> => {
        return this.httpObservable.post<AdvancePaymentRefund[]>(kebabCase(nameof(this.list)), advancePaymentRefundFilter)
            .pipe(map((response: AxiosResponse<AdvancePaymentRefund[]>) => response.data));
    };

    public get = (id: number | string): Observable<AdvancePaymentRefund> => {
        return this.httpObservable.post<AdvancePaymentRefund>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<AdvancePaymentRefund>) => response.data));
    };

    public create = (advancePaymentRefund: AdvancePaymentRefund): Observable<AdvancePaymentRefund> => {
        return this.httpObservable.post<AdvancePaymentRefund>(kebabCase(nameof(this.create)), advancePaymentRefund)
            .pipe(map((response: AxiosResponse<AdvancePaymentRefund>) => response.data));
    };

    public update = (advancePaymentRefund: AdvancePaymentRefund): Observable<AdvancePaymentRefund> => {
        return this.httpObservable.post<AdvancePaymentRefund>(kebabCase(nameof(this.update)), advancePaymentRefund)
            .pipe(map((response: AxiosResponse<AdvancePaymentRefund>) => response.data));
    };

    public delete = (advancePaymentRefund: AdvancePaymentRefund): Observable<AdvancePaymentRefund> => {
        return this.httpObservable.post<AdvancePaymentRefund>(kebabCase(nameof(this.delete)), advancePaymentRefund)
            .pipe(map((response: AxiosResponse<AdvancePaymentRefund>) => response.data));
    };

    public save = (advancePaymentRefund: AdvancePaymentRefund): Observable<AdvancePaymentRefund> => {
        return advancePaymentRefund.id ? this.update(advancePaymentRefund) : this.create(advancePaymentRefund);
    };

    public singleListAdvancePayment = (advancePaymentFilter: AdvancePaymentFilter): Observable<AdvancePayment[]> => {
        return this.httpObservable.post<AdvancePayment[]>(kebabCase(nameof(this.singleListAdvancePayment)), advancePaymentFilter)
            .pipe(map((response: AxiosResponse<AdvancePayment[]>) => response.data));
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

export const advancePaymentRefundRepository = new AdvancePaymentRefundRepository();
