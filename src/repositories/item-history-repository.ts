import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ITEM_HISTORY_PREFIX } from "config/api-consts";
import { ItemHistory, ItemHistoryFilter } from 'models/ItemHistory';
import { Item, ItemFilter } from 'models/Item';
import { AppUser, AppUserFilter } from 'models/AppUser';

export class ItemHistoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ITEM_HISTORY_PREFIX);
    }

    public count = (itemHistoryFilter?: ItemHistoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), itemHistoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (itemHistoryFilter?: ItemHistoryFilter): Observable<ItemHistory[]> => {
        return this.httpObservable.post<ItemHistory[]>(kebabCase(nameof(this.list)), itemHistoryFilter)
            .pipe(map((response: AxiosResponse<ItemHistory[]>) => response.data));
    };

    public get = (id: number | string): Observable<ItemHistory> => {
        return this.httpObservable.post<ItemHistory>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ItemHistory>) => response.data));
    };

    public create = (itemHistory: ItemHistory): Observable<ItemHistory> => {
        return this.httpObservable.post<ItemHistory>(kebabCase(nameof(this.create)), itemHistory)
            .pipe(map((response: AxiosResponse<ItemHistory>) => response.data));
    };

    public update = (itemHistory: ItemHistory): Observable<ItemHistory> => {
        return this.httpObservable.post<ItemHistory>(kebabCase(nameof(this.update)), itemHistory)
            .pipe(map((response: AxiosResponse<ItemHistory>) => response.data));
    };

    public delete = (itemHistory: ItemHistory): Observable<ItemHistory> => {
        return this.httpObservable.post<ItemHistory>(kebabCase(nameof(this.delete)), itemHistory)
            .pipe(map((response: AxiosResponse<ItemHistory>) => response.data));
    };

    public save = (itemHistory: ItemHistory): Observable<ItemHistory> => {
        return itemHistory.id ? this.update(itemHistory) : this.create(itemHistory);
    };

    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
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

export const itemHistoryRepository = new ItemHistoryRepository();
