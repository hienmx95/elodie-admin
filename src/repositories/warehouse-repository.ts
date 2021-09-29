import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WAREHOUSE_PREFIX } from "config/api-consts";
import { Warehouse, WarehouseFilter } from 'models/Warehouse';
import { District, DistrictFilter } from 'models/District';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Province, ProvinceFilter } from 'models/Province';
import { Status, StatusFilter } from 'models/Status';
import { Ward, WardFilter } from 'models/Ward';

export class WarehouseRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WAREHOUSE_PREFIX);
    }

    public count = (warehouseFilter?: WarehouseFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), warehouseFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (warehouseFilter?: WarehouseFilter): Observable<Warehouse[]> => {
        return this.httpObservable.post<Warehouse[]>(kebabCase(nameof(this.list)), warehouseFilter)
            .pipe(map((response: AxiosResponse<Warehouse[]>) => response.data));
    };

    public get = (id: number | string): Observable<Warehouse> => {
        return this.httpObservable.post<Warehouse>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Warehouse>) => response.data));
    };

    public create = (warehouse: Warehouse): Observable<Warehouse> => {
        return this.httpObservable.post<Warehouse>(kebabCase(nameof(this.create)), warehouse)
            .pipe(map((response: AxiosResponse<Warehouse>) => response.data));
    };

    public update = (warehouse: Warehouse): Observable<Warehouse> => {
        return this.httpObservable.post<Warehouse>(kebabCase(nameof(this.update)), warehouse)
            .pipe(map((response: AxiosResponse<Warehouse>) => response.data));
    };

    public delete = (warehouse: Warehouse): Observable<Warehouse> => {
        return this.httpObservable.post<Warehouse>(kebabCase(nameof(this.delete)), warehouse)
            .pipe(map((response: AxiosResponse<Warehouse>) => response.data));
    };

    public save = (warehouse: Warehouse): Observable<Warehouse> => {
        return warehouse.id ? this.update(warehouse) : this.create(warehouse);
    };

    public singleListDistrict = (districtFilter: DistrictFilter): Observable<District[]> => {
        return this.httpObservable.post<District[]>(kebabCase(nameof(this.singleListDistrict)), districtFilter)
            .pipe(map((response: AxiosResponse<District[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListProvince = (provinceFilter: ProvinceFilter): Observable<Province[]> => {
        return this.httpObservable.post<Province[]>(kebabCase(nameof(this.singleListProvince)), provinceFilter)
            .pipe(map((response: AxiosResponse<Province[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListWard = (wardFilter: WardFilter): Observable<Ward[]> => {
        return this.httpObservable.post<Ward[]>(kebabCase(nameof(this.singleListWard)), wardFilter)
            .pipe(map((response: AxiosResponse<Ward[]>) => response.data));
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

export const warehouseRepository = new WarehouseRepository();
