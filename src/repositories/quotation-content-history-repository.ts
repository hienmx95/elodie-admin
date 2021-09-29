import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_QUOTATION_CONTENT_HISTORY_PREFIX } from "config/api-consts";
import { QuotationContentHistory, QuotationContentHistoryFilter } from 'models/QuotationContentHistory';
import { QuotationContent, QuotationContentFilter } from 'models/QuotationContent';
import { QuotationHistory, QuotationHistoryFilter } from 'models/QuotationHistory';

export class QuotationContentHistoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_QUOTATION_CONTENT_HISTORY_PREFIX);
    }

    public count = (quotationContentHistoryFilter?: QuotationContentHistoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), quotationContentHistoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (quotationContentHistoryFilter?: QuotationContentHistoryFilter): Observable<QuotationContentHistory[]> => {
        return this.httpObservable.post<QuotationContentHistory[]>(kebabCase(nameof(this.list)), quotationContentHistoryFilter)
            .pipe(map((response: AxiosResponse<QuotationContentHistory[]>) => response.data));
    };

    public get = (id: number | string): Observable<QuotationContentHistory> => {
        return this.httpObservable.post<QuotationContentHistory>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<QuotationContentHistory>) => response.data));
    };

    public create = (quotationContentHistory: QuotationContentHistory): Observable<QuotationContentHistory> => {
        return this.httpObservable.post<QuotationContentHistory>(kebabCase(nameof(this.create)), quotationContentHistory)
            .pipe(map((response: AxiosResponse<QuotationContentHistory>) => response.data));
    };

    public update = (quotationContentHistory: QuotationContentHistory): Observable<QuotationContentHistory> => {
        return this.httpObservable.post<QuotationContentHistory>(kebabCase(nameof(this.update)), quotationContentHistory)
            .pipe(map((response: AxiosResponse<QuotationContentHistory>) => response.data));
    };

    public delete = (quotationContentHistory: QuotationContentHistory): Observable<QuotationContentHistory> => {
        return this.httpObservable.post<QuotationContentHistory>(kebabCase(nameof(this.delete)), quotationContentHistory)
            .pipe(map((response: AxiosResponse<QuotationContentHistory>) => response.data));
    };

    public save = (quotationContentHistory: QuotationContentHistory): Observable<QuotationContentHistory> => {
        return quotationContentHistory.id ? this.update(quotationContentHistory) : this.create(quotationContentHistory);
    };

    public singleListQuotationContent = (quotationContentFilter: QuotationContentFilter): Observable<QuotationContent[]> => {
        return this.httpObservable.post<QuotationContent[]>(kebabCase(nameof(this.singleListQuotationContent)), quotationContentFilter)
            .pipe(map((response: AxiosResponse<QuotationContent[]>) => response.data));
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

export const quotationContentHistoryRepository = new QuotationContentHistoryRepository();
