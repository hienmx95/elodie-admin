import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_PLAN_CONTENT_PREFIX } from "config/api-consts";
import { PurchasePlanContent, PurchasePlanContentFilter } from 'models/PurchasePlanContent';
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
import { PurchasePlan, PurchasePlanFilter } from 'models/PurchasePlan';
import { PurchaseRequestContent, PurchaseRequestContentFilter } from 'models/PurchaseRequestContent';
import { SavingType, SavingTypeFilter } from 'models/SavingType';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class PurchasePlanContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_PLAN_CONTENT_PREFIX);
    }

    public count = (purchasePlanContentFilter?: PurchasePlanContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchasePlanContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchasePlanContentFilter?: PurchasePlanContentFilter): Observable<PurchasePlanContent[]> => {
        return this.httpObservable.post<PurchasePlanContent[]>(kebabCase(nameof(this.list)), purchasePlanContentFilter)
            .pipe(map((response: AxiosResponse<PurchasePlanContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchasePlanContent> => {
        return this.httpObservable.post<PurchasePlanContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchasePlanContent>) => response.data));
    };

    public create = (purchasePlanContent: PurchasePlanContent): Observable<PurchasePlanContent> => {
        return this.httpObservable.post<PurchasePlanContent>(kebabCase(nameof(this.create)), purchasePlanContent)
            .pipe(map((response: AxiosResponse<PurchasePlanContent>) => response.data));
    };

    public update = (purchasePlanContent: PurchasePlanContent): Observable<PurchasePlanContent> => {
        return this.httpObservable.post<PurchasePlanContent>(kebabCase(nameof(this.update)), purchasePlanContent)
            .pipe(map((response: AxiosResponse<PurchasePlanContent>) => response.data));
    };

    public delete = (purchasePlanContent: PurchasePlanContent): Observable<PurchasePlanContent> => {
        return this.httpObservable.post<PurchasePlanContent>(kebabCase(nameof(this.delete)), purchasePlanContent)
            .pipe(map((response: AxiosResponse<PurchasePlanContent>) => response.data));
    };

    public save = (purchasePlanContent: PurchasePlanContent): Observable<PurchasePlanContent> => {
        return purchasePlanContent.id ? this.update(purchasePlanContent) : this.create(purchasePlanContent);
    };

    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListPurchasePlan = (purchasePlanFilter: PurchasePlanFilter): Observable<PurchasePlan[]> => {
        return this.httpObservable.post<PurchasePlan[]>(kebabCase(nameof(this.singleListPurchasePlan)), purchasePlanFilter)
            .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
    };
    public singleListPurchaseRequestContent = (purchaseRequestContentFilter: PurchaseRequestContentFilter): Observable<PurchaseRequestContent[]> => {
        return this.httpObservable.post<PurchaseRequestContent[]>(kebabCase(nameof(this.singleListPurchaseRequestContent)), purchaseRequestContentFilter)
            .pipe(map((response: AxiosResponse<PurchaseRequestContent[]>) => response.data));
    };
    public singleListSavingType = (): Observable<SavingType[]> => {
        return this.httpObservable.post<SavingType[]>(kebabCase(nameof(this.singleListSavingType)), new SavingTypeFilter())
            .pipe(map((response: AxiosResponse<SavingType[]>) => response.data));
    };
    public singleListTaxType = (taxTypeFilter: TaxTypeFilter): Observable<TaxType[]> => {
        return this.httpObservable.post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
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

export const purchasePlanContentRepository = new PurchasePlanContentRepository();
