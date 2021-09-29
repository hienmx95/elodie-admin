import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_USED_VARIATION_PREFIX } from "config/api-consts";
import { UsedVariation, UsedVariationFilter } from 'models/UsedVariation';

export class UsedVariationRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_USED_VARIATION_PREFIX);
    }

    public count = (usedVariationFilter?: UsedVariationFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), usedVariationFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (usedVariationFilter?: UsedVariationFilter): Observable<UsedVariation[]> => {
        return this.httpObservable.post<UsedVariation[]>(kebabCase(nameof(this.list)), usedVariationFilter)
            .pipe(map((response: AxiosResponse<UsedVariation[]>) => response.data));
    };

    public get = (id: number | string): Observable<UsedVariation> => {
        return this.httpObservable.post<UsedVariation>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<UsedVariation>) => response.data));
    };

    public create = (usedVariation: UsedVariation): Observable<UsedVariation> => {
        return this.httpObservable.post<UsedVariation>(kebabCase(nameof(this.create)), usedVariation)
            .pipe(map((response: AxiosResponse<UsedVariation>) => response.data));
    };

    public update = (usedVariation: UsedVariation): Observable<UsedVariation> => {
        return this.httpObservable.post<UsedVariation>(kebabCase(nameof(this.update)), usedVariation)
            .pipe(map((response: AxiosResponse<UsedVariation>) => response.data));
    };

    public delete = (usedVariation: UsedVariation): Observable<UsedVariation> => {
        return this.httpObservable.post<UsedVariation>(kebabCase(nameof(this.delete)), usedVariation)
            .pipe(map((response: AxiosResponse<UsedVariation>) => response.data));
    };

    public save = (usedVariation: UsedVariation): Observable<UsedVariation> => {
        return usedVariation.id ? this.update(usedVariation) : this.create(usedVariation);
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

export const usedVariationRepository = new UsedVariationRepository();
