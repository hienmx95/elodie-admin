import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_EDITED_PRICE_STATUS_PREFIX } from "config/api-consts";
import { EditedPriceStatus, EditedPriceStatusFilter } from 'models/EditedPriceStatus';

export class EditedPriceStatusRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_EDITED_PRICE_STATUS_PREFIX);
    }

    public count = (editedPriceStatusFilter?: EditedPriceStatusFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), editedPriceStatusFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (editedPriceStatusFilter?: EditedPriceStatusFilter): Observable<EditedPriceStatus[]> => {
        return this.httpObservable.post<EditedPriceStatus[]>(kebabCase(nameof(this.list)), editedPriceStatusFilter)
            .pipe(map((response: AxiosResponse<EditedPriceStatus[]>) => response.data));
    };

    public get = (id: number | string): Observable<EditedPriceStatus> => {
        return this.httpObservable.post<EditedPriceStatus>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<EditedPriceStatus>) => response.data));
    };

    public create = (editedPriceStatus: EditedPriceStatus): Observable<EditedPriceStatus> => {
        return this.httpObservable.post<EditedPriceStatus>(kebabCase(nameof(this.create)), editedPriceStatus)
            .pipe(map((response: AxiosResponse<EditedPriceStatus>) => response.data));
    };

    public update = (editedPriceStatus: EditedPriceStatus): Observable<EditedPriceStatus> => {
        return this.httpObservable.post<EditedPriceStatus>(kebabCase(nameof(this.update)), editedPriceStatus)
            .pipe(map((response: AxiosResponse<EditedPriceStatus>) => response.data));
    };

    public delete = (editedPriceStatus: EditedPriceStatus): Observable<EditedPriceStatus> => {
        return this.httpObservable.post<EditedPriceStatus>(kebabCase(nameof(this.delete)), editedPriceStatus)
            .pipe(map((response: AxiosResponse<EditedPriceStatus>) => response.data));
    };

    public save = (editedPriceStatus: EditedPriceStatus): Observable<EditedPriceStatus> => {
        return editedPriceStatus.id ? this.update(editedPriceStatus) : this.create(editedPriceStatus);
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

export const editedPriceStatusRepository = new EditedPriceStatusRepository();
