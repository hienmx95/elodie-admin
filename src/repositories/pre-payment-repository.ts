import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRE_PAYMENT_PREFIX } from "config/api-consts";
import { PrePayment, PrePaymentFilter } from 'models/PrePayment';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Expense, ExpenseFilter } from 'models/Expense';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Project, ProjectFilter } from 'models/Project';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';

export class PrePaymentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRE_PAYMENT_PREFIX);
    }

    public count = (prePaymentFilter?: PrePaymentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), prePaymentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (prePaymentFilter?: PrePaymentFilter): Observable<PrePayment[]> => {
        return this.httpObservable.post<PrePayment[]>(kebabCase(nameof(this.list)), prePaymentFilter)
            .pipe(map((response: AxiosResponse<PrePayment[]>) => response.data));
    };

    public get = (id: number | string): Observable<PrePayment> => {
        return this.httpObservable.post<PrePayment>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PrePayment>) => response.data));
    };

    public create = (prePayment: PrePayment): Observable<PrePayment> => {
        return this.httpObservable.post<PrePayment>(kebabCase(nameof(this.create)), prePayment)
            .pipe(map((response: AxiosResponse<PrePayment>) => response.data));
    };

    public update = (prePayment: PrePayment): Observable<PrePayment> => {
        return this.httpObservable.post<PrePayment>(kebabCase(nameof(this.update)), prePayment)
            .pipe(map((response: AxiosResponse<PrePayment>) => response.data));
    };

    public delete = (prePayment: PrePayment): Observable<PrePayment> => {
        return this.httpObservable.post<PrePayment>(kebabCase(nameof(this.delete)), prePayment)
            .pipe(map((response: AxiosResponse<PrePayment>) => response.data));
    };

    public save = (prePayment: PrePayment): Observable<PrePayment> => {
        return prePayment.id ? this.update(prePayment) : this.create(prePayment);
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

export const prePaymentRepository = new PrePaymentRepository();
