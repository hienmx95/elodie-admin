import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRODUCT_TYPE_PREFIX } from "config/api-consts";
import { ProductType, ProductTypeFilter } from 'models/ProductType';
import { Status, StatusFilter } from 'models/Status';

export class ProductTypeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRODUCT_TYPE_PREFIX);
    }

    public count = (productTypeFilter?: ProductTypeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), productTypeFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (productTypeFilter?: ProductTypeFilter): Observable<ProductType[]> => {
        return this.httpObservable.post<ProductType[]>(kebabCase(nameof(this.list)), productTypeFilter)
            .pipe(map((response: AxiosResponse<ProductType[]>) => response.data));
    };

    public get = (id: number | string): Observable<ProductType> => {
        return this.httpObservable.post<ProductType>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ProductType>) => response.data));
    };

    public create = (productType: ProductType): Observable<ProductType> => {
        return this.httpObservable.post<ProductType>(kebabCase(nameof(this.create)), productType)
            .pipe(map((response: AxiosResponse<ProductType>) => response.data));
    };

    public update = (productType: ProductType): Observable<ProductType> => {
        return this.httpObservable.post<ProductType>(kebabCase(nameof(this.update)), productType)
            .pipe(map((response: AxiosResponse<ProductType>) => response.data));
    };

    public delete = (productType: ProductType): Observable<ProductType> => {
        return this.httpObservable.post<ProductType>(kebabCase(nameof(this.delete)), productType)
            .pipe(map((response: AxiosResponse<ProductType>) => response.data));
    };

    public save = (productType: ProductType): Observable<ProductType> => {
        return productType.id ? this.update(productType) : this.create(productType);
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

export const productTypeRepository = new ProductTypeRepository();
