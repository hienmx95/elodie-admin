import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_ORDER_CONDITION_PREFIX } from "config/api-consts";
import { PurchaseOrderCondition, PurchaseOrderConditionFilter } from 'models/PurchaseOrderCondition';
import { PurchaseOrder, PurchaseOrderFilter } from 'models/PurchaseOrder';

export class PurchaseOrderConditionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_ORDER_CONDITION_PREFIX);
    }

    public count = (purchaseOrderConditionFilter?: PurchaseOrderConditionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchaseOrderConditionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchaseOrderConditionFilter?: PurchaseOrderConditionFilter): Observable<PurchaseOrderCondition[]> => {
        return this.httpObservable.post<PurchaseOrderCondition[]>(kebabCase(nameof(this.list)), purchaseOrderConditionFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrderCondition[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchaseOrderCondition> => {
        return this.httpObservable.post<PurchaseOrderCondition>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchaseOrderCondition>) => response.data));
    };

    public create = (purchaseOrderCondition: PurchaseOrderCondition): Observable<PurchaseOrderCondition> => {
        return this.httpObservable.post<PurchaseOrderCondition>(kebabCase(nameof(this.create)), purchaseOrderCondition)
            .pipe(map((response: AxiosResponse<PurchaseOrderCondition>) => response.data));
    };

    public update = (purchaseOrderCondition: PurchaseOrderCondition): Observable<PurchaseOrderCondition> => {
        return this.httpObservable.post<PurchaseOrderCondition>(kebabCase(nameof(this.update)), purchaseOrderCondition)
            .pipe(map((response: AxiosResponse<PurchaseOrderCondition>) => response.data));
    };

    public delete = (purchaseOrderCondition: PurchaseOrderCondition): Observable<PurchaseOrderCondition> => {
        return this.httpObservable.post<PurchaseOrderCondition>(kebabCase(nameof(this.delete)), purchaseOrderCondition)
            .pipe(map((response: AxiosResponse<PurchaseOrderCondition>) => response.data));
    };

    public save = (purchaseOrderCondition: PurchaseOrderCondition): Observable<PurchaseOrderCondition> => {
        return purchaseOrderCondition.id ? this.update(purchaseOrderCondition) : this.create(purchaseOrderCondition);
    };

    public singleListPurchaseOrder = (purchaseOrderFilter: PurchaseOrderFilter): Observable<PurchaseOrder[]> => {
        return this.httpObservable.post<PurchaseOrder[]>(kebabCase(nameof(this.singleListPurchaseOrder)), purchaseOrderFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrder[]>) => response.data));
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

export const purchaseOrderConditionRepository = new PurchaseOrderConditionRepository();
