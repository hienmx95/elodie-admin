import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ITEM_PREFIX } from "config/api-consts";
import { Item, ItemFilter } from 'models/Item';
import { Product, ProductFilter } from 'models/Product';
import { Status, StatusFilter } from 'models/Status';

export class ItemRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ITEM_PREFIX);
    }

    public count = (itemFilter?: ItemFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), itemFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (itemFilter?: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.list)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };

    public get = (id: number | string): Observable<Item> => {
        return this.httpObservable.post<Item>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Item>) => response.data));
    };

    public create = (item: Item): Observable<Item> => {
        return this.httpObservable.post<Item>(kebabCase(nameof(this.create)), item)
            .pipe(map((response: AxiosResponse<Item>) => response.data));
    };

    public update = (item: Item): Observable<Item> => {
        return this.httpObservable.post<Item>(kebabCase(nameof(this.update)), item)
            .pipe(map((response: AxiosResponse<Item>) => response.data));
    };

    public delete = (item: Item): Observable<Item> => {
        return this.httpObservable.post<Item>(kebabCase(nameof(this.delete)), item)
            .pipe(map((response: AxiosResponse<Item>) => response.data));
    };

    public save = (item: Item): Observable<Item> => {
        return item.id ? this.update(item) : this.create(item);
    };

    public singleListProduct = (productFilter: ProductFilter): Observable<Product[]> => {
        return this.httpObservable.post<Product[]>(kebabCase(nameof(this.singleListProduct)), productFilter)
            .pipe(map((response: AxiosResponse<Product[]>) => response.data));
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

export const itemRepository = new ItemRepository();
