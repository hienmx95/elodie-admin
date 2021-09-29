import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_INVOICE_PREFIX } from "config/api-consts";
import { Invoice, InvoiceFilter } from 'models/Invoice';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Expense, ExpenseFilter } from 'models/Expense';

export class InvoiceRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_INVOICE_PREFIX);
    }

    public count = (invoiceFilter?: InvoiceFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), invoiceFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (invoiceFilter?: InvoiceFilter): Observable<Invoice[]> => {
        return this.httpObservable.post<Invoice[]>(kebabCase(nameof(this.list)), invoiceFilter)
            .pipe(map((response: AxiosResponse<Invoice[]>) => response.data));
    };

    public get = (id: number | string): Observable<Invoice> => {
        return this.httpObservable.post<Invoice>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Invoice>) => response.data));
    };

    public create = (invoice: Invoice): Observable<Invoice> => {
        return this.httpObservable.post<Invoice>(kebabCase(nameof(this.create)), invoice)
            .pipe(map((response: AxiosResponse<Invoice>) => response.data));
    };

    public update = (invoice: Invoice): Observable<Invoice> => {
        return this.httpObservable.post<Invoice>(kebabCase(nameof(this.update)), invoice)
            .pipe(map((response: AxiosResponse<Invoice>) => response.data));
    };

    public delete = (invoice: Invoice): Observable<Invoice> => {
        return this.httpObservable.post<Invoice>(kebabCase(nameof(this.delete)), invoice)
            .pipe(map((response: AxiosResponse<Invoice>) => response.data));
    };

    public save = (invoice: Invoice): Observable<Invoice> => {
        return invoice.id ? this.update(invoice) : this.create(invoice);
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

export const invoiceRepository = new InvoiceRepository();
