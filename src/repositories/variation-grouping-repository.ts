import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_VARIATION_GROUPING_PREFIX } from "config/api-consts";
import { VariationGrouping, VariationGroupingFilter } from 'models/VariationGrouping';
import { Product, ProductFilter } from 'models/Product';

export class VariationGroupingRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_VARIATION_GROUPING_PREFIX);
    }

    public count = (variationGroupingFilter?: VariationGroupingFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), variationGroupingFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (variationGroupingFilter?: VariationGroupingFilter): Observable<VariationGrouping[]> => {
        return this.httpObservable.post<VariationGrouping[]>(kebabCase(nameof(this.list)), variationGroupingFilter)
            .pipe(map((response: AxiosResponse<VariationGrouping[]>) => response.data));
    };

    public get = (id: number | string): Observable<VariationGrouping> => {
        return this.httpObservable.post<VariationGrouping>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<VariationGrouping>) => response.data));
    };

    public create = (variationGrouping: VariationGrouping): Observable<VariationGrouping> => {
        return this.httpObservable.post<VariationGrouping>(kebabCase(nameof(this.create)), variationGrouping)
            .pipe(map((response: AxiosResponse<VariationGrouping>) => response.data));
    };

    public update = (variationGrouping: VariationGrouping): Observable<VariationGrouping> => {
        return this.httpObservable.post<VariationGrouping>(kebabCase(nameof(this.update)), variationGrouping)
            .pipe(map((response: AxiosResponse<VariationGrouping>) => response.data));
    };

    public delete = (variationGrouping: VariationGrouping): Observable<VariationGrouping> => {
        return this.httpObservable.post<VariationGrouping>(kebabCase(nameof(this.delete)), variationGrouping)
            .pipe(map((response: AxiosResponse<VariationGrouping>) => response.data));
    };

    public save = (variationGrouping: VariationGrouping): Observable<VariationGrouping> => {
        return variationGrouping.id ? this.update(variationGrouping) : this.create(variationGrouping);
    };

    public singleListProduct = (productFilter: ProductFilter): Observable<Product[]> => {
        return this.httpObservable.post<Product[]>(kebabCase(nameof(this.singleListProduct)), productFilter)
            .pipe(map((response: AxiosResponse<Product[]>) => response.data));
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

export const variationGroupingRepository = new VariationGroupingRepository();
