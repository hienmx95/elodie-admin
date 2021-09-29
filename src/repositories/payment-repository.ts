import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PAYMENT_PREFIX } from "config/api-consts";
import { Payment, PaymentFilter } from 'models/Payment';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Invoice, InvoiceFilter } from 'models/Invoice';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Project, ProjectFilter } from 'models/Project';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';

export class PaymentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PAYMENT_PREFIX);
    }

    public count = (paymentFilter?: PaymentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), paymentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (paymentFilter?: PaymentFilter): Observable<Payment[]> => {
        return this.httpObservable.post<Payment[]>(kebabCase(nameof(this.list)), paymentFilter)
            .pipe(map((response: AxiosResponse<Payment[]>) => response.data));
    };

    public get = (id: number | string): Observable<Payment> => {
        return this.httpObservable.post<Payment>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Payment>) => response.data));
    };

    public create = (payment: Payment): Observable<Payment> => {
        return this.httpObservable.post<Payment>(kebabCase(nameof(this.create)), payment)
            .pipe(map((response: AxiosResponse<Payment>) => response.data));
    };

    public update = (payment: Payment): Observable<Payment> => {
        return this.httpObservable.post<Payment>(kebabCase(nameof(this.update)), payment)
            .pipe(map((response: AxiosResponse<Payment>) => response.data));
    };

    public delete = (payment: Payment): Observable<Payment> => {
        return this.httpObservable.post<Payment>(kebabCase(nameof(this.delete)), payment)
            .pipe(map((response: AxiosResponse<Payment>) => response.data));
    };

    public save = (payment: Payment): Observable<Payment> => {
        return payment.id ? this.update(payment) : this.create(payment);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListInvoice = (invoiceFilter: InvoiceFilter): Observable<Invoice[]> => {
        return this.httpObservable.post<Invoice[]>(kebabCase(nameof(this.singleListInvoice)), invoiceFilter)
            .pipe(map((response: AxiosResponse<Invoice[]>) => response.data));
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

export const paymentRepository = new PaymentRepository();
