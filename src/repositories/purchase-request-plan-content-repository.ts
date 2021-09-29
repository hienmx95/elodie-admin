import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_REQUEST_PLAN_CONTENT_PREFIX } from "config/api-consts";
import { PurchaseRequestPlanContent, PurchaseRequestPlanContentFilter } from 'models/PurchaseRequestPlanContent';
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
import { PurchaseRequestPlan, PurchaseRequestPlanFilter } from 'models/PurchaseRequestPlan';

export class PurchaseRequestPlanContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_REQUEST_PLAN_CONTENT_PREFIX);
    }

    public count = (purchaseRequestPlanContentFilter?: PurchaseRequestPlanContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchaseRequestPlanContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchaseRequestPlanContentFilter?: PurchaseRequestPlanContentFilter): Observable<PurchaseRequestPlanContent[]> => {
        return this.httpObservable.post<PurchaseRequestPlanContent[]>(kebabCase(nameof(this.list)), purchaseRequestPlanContentFilter)
            .pipe(map((response: AxiosResponse<PurchaseRequestPlanContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchaseRequestPlanContent> => {
        return this.httpObservable.post<PurchaseRequestPlanContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchaseRequestPlanContent>) => response.data));
    };

    public create = (purchaseRequestPlanContent: PurchaseRequestPlanContent): Observable<PurchaseRequestPlanContent> => {
        return this.httpObservable.post<PurchaseRequestPlanContent>(kebabCase(nameof(this.create)), purchaseRequestPlanContent)
            .pipe(map((response: AxiosResponse<PurchaseRequestPlanContent>) => response.data));
    };

    public update = (purchaseRequestPlanContent: PurchaseRequestPlanContent): Observable<PurchaseRequestPlanContent> => {
        return this.httpObservable.post<PurchaseRequestPlanContent>(kebabCase(nameof(this.update)), purchaseRequestPlanContent)
            .pipe(map((response: AxiosResponse<PurchaseRequestPlanContent>) => response.data));
    };

    public delete = (purchaseRequestPlanContent: PurchaseRequestPlanContent): Observable<PurchaseRequestPlanContent> => {
        return this.httpObservable.post<PurchaseRequestPlanContent>(kebabCase(nameof(this.delete)), purchaseRequestPlanContent)
            .pipe(map((response: AxiosResponse<PurchaseRequestPlanContent>) => response.data));
    };

    public save = (purchaseRequestPlanContent: PurchaseRequestPlanContent): Observable<PurchaseRequestPlanContent> => {
        return purchaseRequestPlanContent.id ? this.update(purchaseRequestPlanContent) : this.create(purchaseRequestPlanContent);
    };

    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListPurchaseRequestPlan = (purchaseRequestPlanFilter: PurchaseRequestPlanFilter): Observable<PurchaseRequestPlan[]> => {
        return this.httpObservable.post<PurchaseRequestPlan[]>(kebabCase(nameof(this.singleListPurchaseRequestPlan)), purchaseRequestPlanFilter)
            .pipe(map((response: AxiosResponse<PurchaseRequestPlan[]>) => response.data));
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

export const purchaseRequestPlanContentRepository = new PurchaseRequestPlanContentRepository();
