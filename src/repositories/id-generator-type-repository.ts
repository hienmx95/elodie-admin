import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ID_GENERATOR_TYPE_PREFIX } from "config/api-consts";
import { IdGeneratorType, IdGeneratorTypeFilter } from 'models/IdGeneratorType';

export class IdGeneratorTypeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ID_GENERATOR_TYPE_PREFIX);
    }

    public count = (idGeneratorTypeFilter?: IdGeneratorTypeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), idGeneratorTypeFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (idGeneratorTypeFilter?: IdGeneratorTypeFilter): Observable<IdGeneratorType[]> => {
        return this.httpObservable.post<IdGeneratorType[]>(kebabCase(nameof(this.list)), idGeneratorTypeFilter)
            .pipe(map((response: AxiosResponse<IdGeneratorType[]>) => response.data));
    };

    public get = (id: number | string): Observable<IdGeneratorType> => {
        return this.httpObservable.post<IdGeneratorType>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<IdGeneratorType>) => response.data));
    };

    public create = (idGeneratorType: IdGeneratorType): Observable<IdGeneratorType> => {
        return this.httpObservable.post<IdGeneratorType>(kebabCase(nameof(this.create)), idGeneratorType)
            .pipe(map((response: AxiosResponse<IdGeneratorType>) => response.data));
    };

    public update = (idGeneratorType: IdGeneratorType): Observable<IdGeneratorType> => {
        return this.httpObservable.post<IdGeneratorType>(kebabCase(nameof(this.update)), idGeneratorType)
            .pipe(map((response: AxiosResponse<IdGeneratorType>) => response.data));
    };

    public delete = (idGeneratorType: IdGeneratorType): Observable<IdGeneratorType> => {
        return this.httpObservable.post<IdGeneratorType>(kebabCase(nameof(this.delete)), idGeneratorType)
            .pipe(map((response: AxiosResponse<IdGeneratorType>) => response.data));
    };

    public save = (idGeneratorType: IdGeneratorType): Observable<IdGeneratorType> => {
        return idGeneratorType.id ? this.update(idGeneratorType) : this.create(idGeneratorType);
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

export const idGeneratorTypeRepository = new IdGeneratorTypeRepository();
