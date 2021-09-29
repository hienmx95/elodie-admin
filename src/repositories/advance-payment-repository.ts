import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ADVANCE_PAYMENT_PREFIX } from "config/api-consts";
import { AdvancePayment, AdvancePaymentFilter } from 'models/AdvancePayment';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Expense, ExpenseFilter } from 'models/Expense';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Project, ProjectFilter } from 'models/Project';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';

export class AdvancePaymentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ADVANCE_PAYMENT_PREFIX);
    }

    public count = (advancePaymentFilter?: AdvancePaymentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), advancePaymentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (advancePaymentFilter?: AdvancePaymentFilter): Observable<AdvancePayment[]> => {
        return this.httpObservable.post<AdvancePayment[]>(kebabCase(nameof(this.list)), advancePaymentFilter)
            .pipe(map((response: AxiosResponse<AdvancePayment[]>) => response.data));
    };

    public get = (id: number | string): Observable<AdvancePayment> => {
        return this.httpObservable.post<AdvancePayment>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<AdvancePayment>) => response.data));
    };

    public create = (advancePayment: AdvancePayment): Observable<AdvancePayment> => {
        return this.httpObservable.post<AdvancePayment>(kebabCase(nameof(this.create)), advancePayment)
            .pipe(map((response: AxiosResponse<AdvancePayment>) => response.data));
    };

    public update = (advancePayment: AdvancePayment): Observable<AdvancePayment> => {
        return this.httpObservable.post<AdvancePayment>(kebabCase(nameof(this.update)), advancePayment)
            .pipe(map((response: AxiosResponse<AdvancePayment>) => response.data));
    };

    public delete = (advancePayment: AdvancePayment): Observable<AdvancePayment> => {
        return this.httpObservable.post<AdvancePayment>(kebabCase(nameof(this.delete)), advancePayment)
            .pipe(map((response: AxiosResponse<AdvancePayment>) => response.data));
    };

    public save = (advancePayment: AdvancePayment): Observable<AdvancePayment> => {
        return advancePayment.id ? this.update(advancePayment) : this.create(advancePayment);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListExpense = (expenseFilter: ExpenseFilter): Observable<Expense[]> => {
        return this.httpObservable.post<Expense[]>(kebabCase(nameof(this.singleListExpense)), expenseFilter)
            .pipe(map((response: AxiosResponse<Expense[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListProject = (projectFilter: ProjectFilter): Observable<Project[]> => {
        return this.httpObservable.post<Project[]>(kebabCase(nameof(this.singleListProject)), projectFilter)
            .pipe(map((response: AxiosResponse<Project[]>) => response.data));
    };
    public singleListProjectBudget = (projectBudgetFilter: ProjectBudgetFilter): Observable<ProjectBudget[]> => {
        return this.httpObservable.post<ProjectBudget[]>(kebabCase(nameof(this.singleListProjectBudget)), projectBudgetFilter)
            .pipe(map((response: AxiosResponse<ProjectBudget[]>) => response.data));
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

export const advancePaymentRepository = new AdvancePaymentRepository();
