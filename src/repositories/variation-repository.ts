import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_VARIATION_PREFIX } from "config/api-consts";
import { Variation, VariationFilter } from 'models/Variation';
import { VariationGrouping, VariationGroupingFilter } from 'models/VariationGrouping';

export class VariationRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_VARIATION_PREFIX);
    }

    public count = (variationFilter?: VariationFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), variationFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (variationFilter?: VariationFilter): Observable<Variation[]> => {
        return this.httpObservable.post<Variation[]>(kebabCase(nameof(this.list)), variationFilter)
            .pipe(map((response: AxiosResponse<Variation[]>) => response.data));
    };

    public get = (id: number | string): Observable<Variation> => {
        return this.httpObservable.post<Variation>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Variation>) => response.data));
    };

    public create = (variation: Variation): Observable<Variation> => {
        return this.httpObservable.post<Variation>(kebabCase(nameof(this.create)), variation)
            .pipe(map((response: AxiosResponse<Variation>) => response.data));
    };

    public update = (variation: Variation): Observable<Variation> => {
        return this.httpObservable.post<Variation>(kebabCase(nameof(this.update)), variation)
            .pipe(map((response: AxiosResponse<Variation>) => response.data));
    };

    public delete = (variation: Variation): Observable<Variation> => {
        return this.httpObservable.post<Variation>(kebabCase(nameof(this.delete)), variation)
            .pipe(map((response: AxiosResponse<Variation>) => response.data));
    };

    public save = (variation: Variation): Observable<Variation> => {
        return variation.id ? this.update(variation) : this.create(variation);
    };

    public singleListVariationGrouping = (variationGroupingFilter: VariationGroupingFilter): Observable<VariationGrouping[]> => {
        return this.httpObservable.post<VariationGrouping[]>(kebabCase(nameof(this.singleListVariationGrouping)), variationGroupingFilter)
            .pipe(map((response: AxiosResponse<VariationGrouping[]>) => response.data));
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

export const variationRepository = new VariationRepository();
