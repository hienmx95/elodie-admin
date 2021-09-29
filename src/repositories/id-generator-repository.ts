import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ID_GENERATOR_PREFIX } from "config/api-consts";
import { IdGenerator, IdGeneratorFilter } from 'models/IdGenerator';
import { IdGeneratorType, IdGeneratorTypeFilter } from 'models/IdGeneratorType';

export class IdGeneratorRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ID_GENERATOR_PREFIX);
    }

    public count = (idGeneratorFilter?: IdGeneratorFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), idGeneratorFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (idGeneratorFilter?: IdGeneratorFilter): Observable<IdGenerator[]> => {
        return this.httpObservable.post<IdGenerator[]>(kebabCase(nameof(this.list)), idGeneratorFilter)
            .pipe(map((response: AxiosResponse<IdGenerator[]>) => response.data));
    };

    public get = (id: number | string): Observable<IdGenerator> => {
        return this.httpObservable.post<IdGenerator>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<IdGenerator>) => response.data));
    };

    public create = (idGenerator: IdGenerator): Observable<IdGenerator> => {
        return this.httpObservable.post<IdGenerator>(kebabCase(nameof(this.create)), idGenerator)
            .pipe(map((response: AxiosResponse<IdGenerator>) => response.data));
    };

    public update = (idGenerator: IdGenerator): Observable<IdGenerator> => {
        return this.httpObservable.post<IdGenerator>(kebabCase(nameof(this.update)), idGenerator)
            .pipe(map((response: AxiosResponse<IdGenerator>) => response.data));
    };

    public delete = (idGenerator: IdGenerator): Observable<IdGenerator> => {
        return this.httpObservable.post<IdGenerator>(kebabCase(nameof(this.delete)), idGenerator)
            .pipe(map((response: AxiosResponse<IdGenerator>) => response.data));
    };

    public save = (idGenerator: IdGenerator): Observable<IdGenerator> => {
        return idGenerator.id ? this.update(idGenerator) : this.create(idGenerator);
    };

    public singleListIdGeneratorType = (idGeneratorTypeFilter: IdGeneratorTypeFilter): Observable<IdGeneratorType[]> => {
        return this.httpObservable.post<IdGeneratorType[]>(kebabCase(nameof(this.singleListIdGeneratorType)), idGeneratorTypeFilter)
            .pipe(map((response: AxiosResponse<IdGeneratorType[]>) => response.data));
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

export const idGeneratorRepository = new IdGeneratorRepository();
