import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_SEX_PREFIX } from "config/api-consts";
import { Sex, SexFilter } from 'models/Sex';

export class SexRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_SEX_PREFIX);
    }

    public count = (sexFilter?: SexFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), sexFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (sexFilter?: SexFilter): Observable<Sex[]> => {
        return this.httpObservable.post<Sex[]>(kebabCase(nameof(this.list)), sexFilter)
            .pipe(map((response: AxiosResponse<Sex[]>) => response.data));
    };

    public get = (id: number | string): Observable<Sex> => {
        return this.httpObservable.post<Sex>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Sex>) => response.data));
    };

    public create = (sex: Sex): Observable<Sex> => {
        return this.httpObservable.post<Sex>(kebabCase(nameof(this.create)), sex)
            .pipe(map((response: AxiosResponse<Sex>) => response.data));
    };

    public update = (sex: Sex): Observable<Sex> => {
        return this.httpObservable.post<Sex>(kebabCase(nameof(this.update)), sex)
            .pipe(map((response: AxiosResponse<Sex>) => response.data));
    };

    public delete = (sex: Sex): Observable<Sex> => {
        return this.httpObservable.post<Sex>(kebabCase(nameof(this.delete)), sex)
            .pipe(map((response: AxiosResponse<Sex>) => response.data));
    };

    public save = (sex: Sex): Observable<Sex> => {
        return sex.id ? this.update(sex) : this.create(sex);
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

export const sexRepository = new SexRepository();
