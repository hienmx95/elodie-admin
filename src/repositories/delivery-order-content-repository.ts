import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_DELIVERY_ORDER_CONTENT_PREFIX } from "config/api-consts";
import { DeliveryOrderContent, DeliveryOrderContentFilter } from 'models/DeliveryOrderContent';
import { Item, ItemFilter } from 'models/Item';
import { DeliveryOrder, DeliveryOrderFilter } from 'models/DeliveryOrder';

export class DeliveryOrderContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_DELIVERY_ORDER_CONTENT_PREFIX);
    }

    public count = (deliveryOrderContentFilter?: DeliveryOrderContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), deliveryOrderContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (deliveryOrderContentFilter?: DeliveryOrderContentFilter): Observable<DeliveryOrderContent[]> => {
        return this.httpObservable.post<DeliveryOrderContent[]>(kebabCase(nameof(this.list)), deliveryOrderContentFilter)
            .pipe(map((response: AxiosResponse<DeliveryOrderContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<DeliveryOrderContent> => {
        return this.httpObservable.post<DeliveryOrderContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<DeliveryOrderContent>) => response.data));
    };

    public create = (deliveryOrderContent: DeliveryOrderContent): Observable<DeliveryOrderContent> => {
        return this.httpObservable.post<DeliveryOrderContent>(kebabCase(nameof(this.create)), deliveryOrderContent)
            .pipe(map((response: AxiosResponse<DeliveryOrderContent>) => response.data));
    };

    public update = (deliveryOrderContent: DeliveryOrderContent): Observable<DeliveryOrderContent> => {
        return this.httpObservable.post<DeliveryOrderContent>(kebabCase(nameof(this.update)), deliveryOrderContent)
            .pipe(map((response: AxiosResponse<DeliveryOrderContent>) => response.data));
    };

    public delete = (deliveryOrderContent: DeliveryOrderContent): Observable<DeliveryOrderContent> => {
        return this.httpObservable.post<DeliveryOrderContent>(kebabCase(nameof(this.delete)), deliveryOrderContent)
            .pipe(map((response: AxiosResponse<DeliveryOrderContent>) => response.data));
    };

    public save = (deliveryOrderContent: DeliveryOrderContent): Observable<DeliveryOrderContent> => {
        return deliveryOrderContent.id ? this.update(deliveryOrderContent) : this.create(deliveryOrderContent);
    };

    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListDeliveryOrder = (deliveryOrderFilter: DeliveryOrderFilter): Observable<DeliveryOrder[]> => {
        return this.httpObservable.post<DeliveryOrder[]>(kebabCase(nameof(this.singleListDeliveryOrder)), deliveryOrderFilter)
            .pipe(map((response: AxiosResponse<DeliveryOrder[]>) => response.data));
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

export const deliveryOrderContentRepository = new DeliveryOrderContentRepository();
