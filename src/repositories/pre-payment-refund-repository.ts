import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRE_PAYMENT_REFUND_PREFIX } from "config/api-consts";
import { PrePaymentRefund, PrePaymentRefundFilter } from 'models/PrePaymentRefund';
import { Currency, CurrencyFilter } from 'models/Currency';
import { PrePayment, PrePaymentFilter } from 'models/PrePayment';
import { Expense, ExpenseFilter } from 'models/Expense';

export class PrePaymentRefundRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRE_PAYMENT_REFUND_PREFIX);
    }

    public count = (prePaymentRefundFilter?: PrePaymentRefundFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), prePaymentRefundFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (prePaymentRefundFilter?: PrePaymentRefundFilter): Observable<PrePaymentRefund[]> => {
        return this.httpObservable.post<PrePaymentRefund[]>(kebabCase(nameof(this.list)), prePaymentRefundFilter)
            .pipe(map((response: AxiosResponse<PrePaymentRefund[]>) => response.data));
    };

    public get = (id: number | string): Observable<PrePaymentRefund> => {
        return this.httpObservable.post<PrePaymentRefund>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PrePaymentRefund>) => response.data));
    };

    public create = (prePaymentRefund: PrePaymentRefund): Observable<PrePaymentRefund> => {
        return this.httpObservable.post<PrePaymentRefund>(kebabCase(nameof(this.create)), prePaymentRefund)
            .pipe(map((response: AxiosResponse<PrePaymentRefund>) => response.data));
    };

    public update = (prePaymentRefund: PrePaymentRefund): Observable<PrePaymentRefund> => {
        return this.httpObservable.post<PrePaymentRefund>(kebabCase(nameof(this.update)), prePaymentRefund)
            .pipe(map((response: AxiosResponse<PrePaymentRefund>) => response.data));
    };

    public delete = (prePaymentRefund: PrePaymentRefund): Observable<PrePaymentRefund> => {
        return this.httpObservable.post<PrePaymentRefund>(kebabCase(nameof(this.delete)), prePaymentRefund)
            .pipe(map((response: AxiosResponse<PrePaymentRefund>) => response.data));
    };

    public save = (prePaymentRefund: PrePaymentRefund): Observable<PrePaymentRefund> => {
        return prePaymentRefund.id ? this.update(prePaymentRefund) : this.create(prePaymentRefund);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListPrePayment = (prePaymentFilter: PrePaymentFilter): Observable<PrePayment[]> => {
        return this.httpObservable.post<PrePayment[]>(kebabCase(nameof(this.singleListPrePayment)), prePaymentFilter)
            .pipe(map((response: AxiosResponse<PrePayment[]>) => response.data));
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

export const prePaymentRefundRepository = new PrePaymentRefundRepository();
