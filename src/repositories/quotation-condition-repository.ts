import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_QUOTATION_CONDITION_PREFIX } from "config/api-consts";
import { QuotationCondition, QuotationConditionFilter } from 'models/QuotationCondition';
import { Quotation, QuotationFilter } from 'models/Quotation';

export class QuotationConditionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_QUOTATION_CONDITION_PREFIX);
    }

    public count = (quotationConditionFilter?: QuotationConditionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), quotationConditionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (quotationConditionFilter?: QuotationConditionFilter): Observable<QuotationCondition[]> => {
        return this.httpObservable.post<QuotationCondition[]>(kebabCase(nameof(this.list)), quotationConditionFilter)
            .pipe(map((response: AxiosResponse<QuotationCondition[]>) => response.data));
    };

    public get = (id: number | string): Observable<QuotationCondition> => {
        return this.httpObservable.post<QuotationCondition>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<QuotationCondition>) => response.data));
    };

    public create = (quotationCondition: QuotationCondition): Observable<QuotationCondition> => {
        return this.httpObservable.post<QuotationCondition>(kebabCase(nameof(this.create)), quotationCondition)
            .pipe(map((response: AxiosResponse<QuotationCondition>) => response.data));
    };

    public update = (quotationCondition: QuotationCondition): Observable<QuotationCondition> => {
        return this.httpObservable.post<QuotationCondition>(kebabCase(nameof(this.update)), quotationCondition)
            .pipe(map((response: AxiosResponse<QuotationCondition>) => response.data));
    };

    public delete = (quotationCondition: QuotationCondition): Observable<QuotationCondition> => {
        return this.httpObservable.post<QuotationCondition>(kebabCase(nameof(this.delete)), quotationCondition)
            .pipe(map((response: AxiosResponse<QuotationCondition>) => response.data));
    };

    public save = (quotationCondition: QuotationCondition): Observable<QuotationCondition> => {
        return quotationCondition.id ? this.update(quotationCondition) : this.create(quotationCondition);
    };

    public singleListQuotation = (quotationFilter: QuotationFilter): Observable<Quotation[]> => {
        return this.httpObservable.post<Quotation[]>(kebabCase(nameof(this.singleListQuotation)), quotationFilter)
            .pipe(map((response: AxiosResponse<Quotation[]>) => response.data));
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

export const quotationConditionRepository = new QuotationConditionRepository();
