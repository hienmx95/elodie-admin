import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_DELIVERY_ORDER_PREFIX } from "config/api-consts";
import { DeliveryOrder, DeliveryOrderFilter } from 'models/DeliveryOrder';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { PurchaseOrder, PurchaseOrderFilter } from 'models/PurchaseOrder';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Status, StatusFilter } from 'models/Status';

export class DeliveryOrderRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_DELIVERY_ORDER_PREFIX);
    }

    public count = (deliveryOrderFilter?: DeliveryOrderFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), deliveryOrderFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (deliveryOrderFilter?: DeliveryOrderFilter): Observable<DeliveryOrder[]> => {
        return this.httpObservable.post<DeliveryOrder[]>(kebabCase(nameof(this.list)), deliveryOrderFilter)
            .pipe(map((response: AxiosResponse<DeliveryOrder[]>) => response.data));
    };

    public get = (id: number | string): Observable<DeliveryOrder> => {
        return this.httpObservable.post<DeliveryOrder>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<DeliveryOrder>) => response.data));
    };

    public create = (deliveryOrder: DeliveryOrder): Observable<DeliveryOrder> => {
        return this.httpObservable.post<DeliveryOrder>(kebabCase(nameof(this.create)), deliveryOrder)
            .pipe(map((response: AxiosResponse<DeliveryOrder>) => response.data));
    };

    public update = (deliveryOrder: DeliveryOrder): Observable<DeliveryOrder> => {
        return this.httpObservable.post<DeliveryOrder>(kebabCase(nameof(this.update)), deliveryOrder)
            .pipe(map((response: AxiosResponse<DeliveryOrder>) => response.data));
    };

    public delete = (deliveryOrder: DeliveryOrder): Observable<DeliveryOrder> => {
        return this.httpObservable.post<DeliveryOrder>(kebabCase(nameof(this.delete)), deliveryOrder)
            .pipe(map((response: AxiosResponse<DeliveryOrder>) => response.data));
    };

    public save = (deliveryOrder: DeliveryOrder): Observable<DeliveryOrder> => {
        return deliveryOrder.id ? this.update(deliveryOrder) : this.create(deliveryOrder);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListPurchaseOrder = (purchaseOrderFilter: PurchaseOrderFilter): Observable<PurchaseOrder[]> => {
        return this.httpObservable.post<PurchaseOrder[]>(kebabCase(nameof(this.singleListPurchaseOrder)), purchaseOrderFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrder[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
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

export const deliveryOrderRepository = new DeliveryOrderRepository();
