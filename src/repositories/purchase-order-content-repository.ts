import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_ORDER_CONTENT_PREFIX } from "config/api-consts";
import { PurchaseOrderContent, PurchaseOrderContentFilter } from 'models/PurchaseOrderContent';
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
import { PurchaseOrder, PurchaseOrderFilter } from 'models/PurchaseOrder';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class PurchaseOrderContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_ORDER_CONTENT_PREFIX);
    }

    public count = (purchaseOrderContentFilter?: PurchaseOrderContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchaseOrderContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchaseOrderContentFilter?: PurchaseOrderContentFilter): Observable<PurchaseOrderContent[]> => {
        return this.httpObservable.post<PurchaseOrderContent[]>(kebabCase(nameof(this.list)), purchaseOrderContentFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrderContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchaseOrderContent> => {
        return this.httpObservable.post<PurchaseOrderContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchaseOrderContent>) => response.data));
    };

    public create = (purchaseOrderContent: PurchaseOrderContent): Observable<PurchaseOrderContent> => {
        return this.httpObservable.post<PurchaseOrderContent>(kebabCase(nameof(this.create)), purchaseOrderContent)
            .pipe(map((response: AxiosResponse<PurchaseOrderContent>) => response.data));
    };

    public update = (purchaseOrderContent: PurchaseOrderContent): Observable<PurchaseOrderContent> => {
        return this.httpObservable.post<PurchaseOrderContent>(kebabCase(nameof(this.update)), purchaseOrderContent)
            .pipe(map((response: AxiosResponse<PurchaseOrderContent>) => response.data));
    };

    public delete = (purchaseOrderContent: PurchaseOrderContent): Observable<PurchaseOrderContent> => {
        return this.httpObservable.post<PurchaseOrderContent>(kebabCase(nameof(this.delete)), purchaseOrderContent)
            .pipe(map((response: AxiosResponse<PurchaseOrderContent>) => response.data));
    };

    public save = (purchaseOrderContent: PurchaseOrderContent): Observable<PurchaseOrderContent> => {
        return purchaseOrderContent.id ? this.update(purchaseOrderContent) : this.create(purchaseOrderContent);
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
    public singleListPurchaseOrder = (purchaseOrderFilter: PurchaseOrderFilter): Observable<PurchaseOrder[]> => {
        return this.httpObservable.post<PurchaseOrder[]>(kebabCase(nameof(this.singleListPurchaseOrder)), purchaseOrderFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrder[]>) => response.data));
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

export const purchaseOrderContentRepository = new PurchaseOrderContentRepository();
