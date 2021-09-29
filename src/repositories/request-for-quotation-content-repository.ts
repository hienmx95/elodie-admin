import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_REQUEST_FOR_QUOTATION_CONTENT_PREFIX } from "config/api-consts";
import { RequestForQuotationContent, RequestForQuotationContentFilter } from 'models/RequestForQuotationContent';
import { Category, CategoryFilter } from 'models/Category';
import { Item, ItemFilter } from 'models/Item';
import { RequestForQuotation, RequestForQuotationFilter } from 'models/RequestForQuotation';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class RequestForQuotationContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_REQUEST_FOR_QUOTATION_CONTENT_PREFIX);
    }

    public count = (requestForQuotationContentFilter?: RequestForQuotationContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), requestForQuotationContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (requestForQuotationContentFilter?: RequestForQuotationContentFilter): Observable<RequestForQuotationContent[]> => {
        return this.httpObservable.post<RequestForQuotationContent[]>(kebabCase(nameof(this.list)), requestForQuotationContentFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotationContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<RequestForQuotationContent> => {
        return this.httpObservable.post<RequestForQuotationContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<RequestForQuotationContent>) => response.data));
    };

    public create = (requestForQuotationContent: RequestForQuotationContent): Observable<RequestForQuotationContent> => {
        return this.httpObservable.post<RequestForQuotationContent>(kebabCase(nameof(this.create)), requestForQuotationContent)
            .pipe(map((response: AxiosResponse<RequestForQuotationContent>) => response.data));
    };

    public update = (requestForQuotationContent: RequestForQuotationContent): Observable<RequestForQuotationContent> => {
        return this.httpObservable.post<RequestForQuotationContent>(kebabCase(nameof(this.update)), requestForQuotationContent)
            .pipe(map((response: AxiosResponse<RequestForQuotationContent>) => response.data));
    };

    public delete = (requestForQuotationContent: RequestForQuotationContent): Observable<RequestForQuotationContent> => {
        return this.httpObservable.post<RequestForQuotationContent>(kebabCase(nameof(this.delete)), requestForQuotationContent)
            .pipe(map((response: AxiosResponse<RequestForQuotationContent>) => response.data));
    };

    public save = (requestForQuotationContent: RequestForQuotationContent): Observable<RequestForQuotationContent> => {
        return requestForQuotationContent.id ? this.update(requestForQuotationContent) : this.create(requestForQuotationContent);
    };

    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListRequestForQuotation = (requestForQuotationFilter: RequestForQuotationFilter): Observable<RequestForQuotation[]> => {
        return this.httpObservable.post<RequestForQuotation[]>(kebabCase(nameof(this.singleListRequestForQuotation)), requestForQuotationFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotation[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
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

export const requestForQuotationContentRepository = new RequestForQuotationContentRepository();
