import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_QUOTATION_CONDITION_HISTORY_PREFIX } from "config/api-consts";
import { QuotationConditionHistory, QuotationConditionHistoryFilter } from 'models/QuotationConditionHistory';
import { QuotationHistory, QuotationHistoryFilter } from 'models/QuotationHistory';

export class QuotationConditionHistoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_QUOTATION_CONDITION_HISTORY_PREFIX);
    }

    public count = (quotationConditionHistoryFilter?: QuotationConditionHistoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), quotationConditionHistoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (quotationConditionHistoryFilter?: QuotationConditionHistoryFilter): Observable<QuotationConditionHistory[]> => {
        return this.httpObservable.post<QuotationConditionHistory[]>(kebabCase(nameof(this.list)), quotationConditionHistoryFilter)
            .pipe(map((response: AxiosResponse<QuotationConditionHistory[]>) => response.data));
    };

    public get = (id: number | string): Observable<QuotationConditionHistory> => {
        return this.httpObservable.post<QuotationConditionHistory>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<QuotationConditionHistory>) => response.data));
    };

    public create = (quotationConditionHistory: QuotationConditionHistory): Observable<QuotationConditionHistory> => {
        return this.httpObservable.post<QuotationConditionHistory>(kebabCase(nameof(this.create)), quotationConditionHistory)
            .pipe(map((response: AxiosResponse<QuotationConditionHistory>) => response.data));
    };

    public update = (quotationConditionHistory: QuotationConditionHistory): Observable<QuotationConditionHistory> => {
        return this.httpObservable.post<QuotationConditionHistory>(kebabCase(nameof(this.update)), quotationConditionHistory)
            .pipe(map((response: AxiosResponse<QuotationConditionHistory>) => response.data));
    };

    public delete = (quotationConditionHistory: QuotationConditionHistory): Observable<QuotationConditionHistory> => {
        return this.httpObservable.post<QuotationConditionHistory>(kebabCase(nameof(this.delete)), quotationConditionHistory)
            .pipe(map((response: AxiosResponse<QuotationConditionHistory>) => response.data));
    };

    public save = (quotationConditionHistory: QuotationConditionHistory): Observable<QuotationConditionHistory> => {
        return quotationConditionHistory.id ? this.update(quotationConditionHistory) : this.create(quotationConditionHistory);
    };

    public singleListQuotationHistory = (quotationHistoryFilter: QuotationHistoryFilter): Observable<QuotationHistory[]> => {
        return this.httpObservable.post<QuotationHistory[]>(kebabCase(nameof(this.singleListQuotationHistory)), quotationHistoryFilter)
            .pipe(map((response: AxiosResponse<QuotationHistory[]>) => response.data));
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

export const quotationConditionHistoryRepository = new QuotationConditionHistoryRepository();
