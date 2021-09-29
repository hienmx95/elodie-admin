import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_EXPENSE_TRANSACTION_PREFIX } from "config/api-consts";
import { ExpenseTransaction, ExpenseTransactionFilter } from 'models/ExpenseTransaction';
import { Expense, ExpenseFilter } from 'models/Expense';
import { Organization, OrganizationFilter } from 'models/Organization';

export class ExpenseTransactionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_EXPENSE_TRANSACTION_PREFIX);
    }

    public count = (expenseTransactionFilter?: ExpenseTransactionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), expenseTransactionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (expenseTransactionFilter?: ExpenseTransactionFilter): Observable<ExpenseTransaction[]> => {
        return this.httpObservable.post<ExpenseTransaction[]>(kebabCase(nameof(this.list)), expenseTransactionFilter)
            .pipe(map((response: AxiosResponse<ExpenseTransaction[]>) => response.data));
    };

    public get = (id: number | string): Observable<ExpenseTransaction> => {
        return this.httpObservable.post<ExpenseTransaction>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ExpenseTransaction>) => response.data));
    };

    public create = (expenseTransaction: ExpenseTransaction): Observable<ExpenseTransaction> => {
        return this.httpObservable.post<ExpenseTransaction>(kebabCase(nameof(this.create)), expenseTransaction)
            .pipe(map((response: AxiosResponse<ExpenseTransaction>) => response.data));
    };

    public update = (expenseTransaction: ExpenseTransaction): Observable<ExpenseTransaction> => {
        return this.httpObservable.post<ExpenseTransaction>(kebabCase(nameof(this.update)), expenseTransaction)
            .pipe(map((response: AxiosResponse<ExpenseTransaction>) => response.data));
    };

    public delete = (expenseTransaction: ExpenseTransaction): Observable<ExpenseTransaction> => {
        return this.httpObservable.post<ExpenseTransaction>(kebabCase(nameof(this.delete)), expenseTransaction)
            .pipe(map((response: AxiosResponse<ExpenseTransaction>) => response.data));
    };

    public save = (expenseTransaction: ExpenseTransaction): Observable<ExpenseTransaction> => {
        return expenseTransaction.id ? this.update(expenseTransaction) : this.create(expenseTransaction);
    };

    public singleListExpense = (expenseFilter: ExpenseFilter): Observable<Expense[]> => {
        return this.httpObservable.post<Expense[]>(kebabCase(nameof(this.singleListExpense)), expenseFilter)
            .pipe(map((response: AxiosResponse<Expense[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
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

export const expenseTransactionRepository = new ExpenseTransactionRepository();
