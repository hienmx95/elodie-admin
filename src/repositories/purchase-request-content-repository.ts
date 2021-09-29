import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_REQUEST_CONTENT_PREFIX } from "config/api-consts";
import { PurchaseRequestContent, PurchaseRequestContentFilter } from 'models/PurchaseRequestContent';
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
import { PurchaseRequest, PurchaseRequestFilter } from 'models/PurchaseRequest';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class PurchaseRequestContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_REQUEST_CONTENT_PREFIX);
    }

    public count = (purchaseRequestContentFilter?: PurchaseRequestContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchaseRequestContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchaseRequestContentFilter?: PurchaseRequestContentFilter): Observable<PurchaseRequestContent[]> => {
        return this.httpObservable.post<PurchaseRequestContent[]>(kebabCase(nameof(this.list)), purchaseRequestContentFilter)
            .pipe(map((response: AxiosResponse<PurchaseRequestContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchaseRequestContent> => {
        return this.httpObservable.post<PurchaseRequestContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchaseRequestContent>) => response.data));
    };

    public create = (purchaseRequestContent: PurchaseRequestContent): Observable<PurchaseRequestContent> => {
        return this.httpObservable.post<PurchaseRequestContent>(kebabCase(nameof(this.create)), purchaseRequestContent)
            .pipe(map((response: AxiosResponse<PurchaseRequestContent>) => response.data));
    };

    public update = (purchaseRequestContent: PurchaseRequestContent): Observable<PurchaseRequestContent> => {
        return this.httpObservable.post<PurchaseRequestContent>(kebabCase(nameof(this.update)), purchaseRequestContent)
            .pipe(map((response: AxiosResponse<PurchaseRequestContent>) => response.data));
    };

    public delete = (purchaseRequestContent: PurchaseRequestContent): Observable<PurchaseRequestContent> => {
        return this.httpObservable.post<PurchaseRequestContent>(kebabCase(nameof(this.delete)), purchaseRequestContent)
            .pipe(map((response: AxiosResponse<PurchaseRequestContent>) => response.data));
    };

    public save = (purchaseRequestContent: PurchaseRequestContent): Observable<PurchaseRequestContent> => {
        return purchaseRequestContent.id ? this.update(purchaseRequestContent) : this.create(purchaseRequestContent);
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
    public singleListPurchaseRequest = (purchaseRequestFilter: PurchaseRequestFilter): Observable<PurchaseRequest[]> => {
        return this.httpObservable.post<PurchaseRequest[]>(kebabCase(nameof(this.singleListPurchaseRequest)), purchaseRequestFilter)
            .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
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

export const purchaseRequestContentRepository = new PurchaseRequestContentRepository();
