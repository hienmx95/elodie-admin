import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_NATION_PREFIX } from "config/api-consts";
import { Nation, NationFilter } from 'models/Nation';
import { Status, StatusFilter } from 'models/Status';

export class NationRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_NATION_PREFIX);
    }

    public count = (nationFilter?: NationFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), nationFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (nationFilter?: NationFilter): Observable<Nation[]> => {
        return this.httpObservable.post<Nation[]>(kebabCase(nameof(this.list)), nationFilter)
            .pipe(map((response: AxiosResponse<Nation[]>) => response.data));
    };

    public get = (id: number | string): Observable<Nation> => {
        return this.httpObservable.post<Nation>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Nation>) => response.data));
    };

    public create = (nation: Nation): Observable<Nation> => {
        return this.httpObservable.post<Nation>(kebabCase(nameof(this.create)), nation)
            .pipe(map((response: AxiosResponse<Nation>) => response.data));
    };

    public update = (nation: Nation): Observable<Nation> => {
        return this.httpObservable.post<Nation>(kebabCase(nameof(this.update)), nation)
            .pipe(map((response: AxiosResponse<Nation>) => response.data));
    };

    public delete = (nation: Nation): Observable<Nation> => {
        return this.httpObservable.post<Nation>(kebabCase(nameof(this.delete)), nation)
            .pipe(map((response: AxiosResponse<Nation>) => response.data));
    };

    public save = (nation: Nation): Observable<Nation> => {
        return nation.id ? this.update(nation) : this.create(nation);
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

export const nationRepository = new NationRepository();
