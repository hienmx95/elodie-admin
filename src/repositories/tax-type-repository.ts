import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_TAX_TYPE_PREFIX } from "config/api-consts";
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { Status, StatusFilter } from 'models/Status';

export class TaxTypeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_TAX_TYPE_PREFIX);
    }

    public count = (taxTypeFilter?: TaxTypeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (taxTypeFilter?: TaxTypeFilter): Observable<TaxType[]> => {
        return this.httpObservable.post<TaxType[]>(kebabCase(nameof(this.list)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
    };

    public get = (id: number | string): Observable<TaxType> => {
        return this.httpObservable.post<TaxType>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<TaxType>) => response.data));
    };

    public create = (taxType: TaxType): Observable<TaxType> => {
        return this.httpObservable.post<TaxType>(kebabCase(nameof(this.create)), taxType)
            .pipe(map((response: AxiosResponse<TaxType>) => response.data));
    };

    public update = (taxType: TaxType): Observable<TaxType> => {
        return this.httpObservable.post<TaxType>(kebabCase(nameof(this.update)), taxType)
            .pipe(map((response: AxiosResponse<TaxType>) => response.data));
    };

    public delete = (taxType: TaxType): Observable<TaxType> => {
        return this.httpObservable.post<TaxType>(kebabCase(nameof(this.delete)), taxType)
            .pipe(map((response: AxiosResponse<TaxType>) => response.data));
    };

    public save = (taxType: TaxType): Observable<TaxType> => {
        return taxType.id ? this.update(taxType) : this.create(taxType);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public filterListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.filterListStatus)), new StatusFilter())
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

export const taxTypeRepository = new TaxTypeRepository();
