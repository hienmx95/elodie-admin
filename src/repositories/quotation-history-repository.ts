import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_QUOTATION_HISTORY_PREFIX } from "config/api-consts";
import { QuotationHistory, QuotationHistoryFilter } from 'models/QuotationHistory';
import { Quotation, QuotationFilter } from 'models/Quotation';

export class QuotationHistoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_QUOTATION_HISTORY_PREFIX);
    }

    public count = (quotationHistoryFilter?: QuotationHistoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), quotationHistoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (quotationHistoryFilter?: QuotationHistoryFilter): Observable<QuotationHistory[]> => {
        return this.httpObservable.post<QuotationHistory[]>(kebabCase(nameof(this.list)), quotationHistoryFilter)
            .pipe(map((response: AxiosResponse<QuotationHistory[]>) => response.data));
    };

    public get = (id: number | string): Observable<QuotationHistory> => {
        return this.httpObservable.post<QuotationHistory>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<QuotationHistory>) => response.data));
    };

    public create = (quotationHistory: QuotationHistory): Observable<QuotationHistory> => {
        return this.httpObservable.post<QuotationHistory>(kebabCase(nameof(this.create)), quotationHistory)
            .pipe(map((response: AxiosResponse<QuotationHistory>) => response.data));
    };

    public update = (quotationHistory: QuotationHistory): Observable<QuotationHistory> => {
        return this.httpObservable.post<QuotationHistory>(kebabCase(nameof(this.update)), quotationHistory)
            .pipe(map((response: AxiosResponse<QuotationHistory>) => response.data));
    };

    public delete = (quotationHistory: QuotationHistory): Observable<QuotationHistory> => {
        return this.httpObservable.post<QuotationHistory>(kebabCase(nameof(this.delete)), quotationHistory)
            .pipe(map((response: AxiosResponse<QuotationHistory>) => response.data));
    };

    public save = (quotationHistory: QuotationHistory): Observable<QuotationHistory> => {
        return quotationHistory.id ? this.update(quotationHistory) : this.create(quotationHistory);
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

export const quotationHistoryRepository = new QuotationHistoryRepository();
