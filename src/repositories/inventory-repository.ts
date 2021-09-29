import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_INVENTORY_PREFIX } from "config/api-consts";
import { Inventory, InventoryFilter } from 'models/Inventory';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Item, ItemFilter } from 'models/Item';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class InventoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_INVENTORY_PREFIX);
    }

    public count = (inventoryFilter?: InventoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), inventoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (inventoryFilter?: InventoryFilter): Observable<Inventory[]> => {
        return this.httpObservable.post<Inventory[]>(kebabCase(nameof(this.list)), inventoryFilter)
            .pipe(map((response: AxiosResponse<Inventory[]>) => response.data));
    };

    public get = (id: number | string): Observable<Inventory> => {
        return this.httpObservable.post<Inventory>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Inventory>) => response.data));
    };

    public create = (inventory: Inventory): Observable<Inventory> => {
        return this.httpObservable.post<Inventory>(kebabCase(nameof(this.create)), inventory)
            .pipe(map((response: AxiosResponse<Inventory>) => response.data));
    };

    public update = (inventory: Inventory): Observable<Inventory> => {
        return this.httpObservable.post<Inventory>(kebabCase(nameof(this.update)), inventory)
            .pipe(map((response: AxiosResponse<Inventory>) => response.data));
    };

    public delete = (inventory: Inventory): Observable<Inventory> => {
        return this.httpObservable.post<Inventory>(kebabCase(nameof(this.delete)), inventory)
            .pipe(map((response: AxiosResponse<Inventory>) => response.data));
    };

    public save = (inventory: Inventory): Observable<Inventory> => {
        return inventory.id ? this.update(inventory) : this.create(inventory);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
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

export const inventoryRepository = new InventoryRepository();
