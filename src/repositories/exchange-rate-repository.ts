import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_EXCHANGE_RATE_PREFIX } from "config/api-consts";
import { ExchangeRate, ExchangeRateFilter } from 'models/ExchangeRate';

export class ExchangeRateRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_EXCHANGE_RATE_PREFIX);
    }

    public count = (exchangeRateFilter?: ExchangeRateFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), exchangeRateFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (exchangeRateFilter?: ExchangeRateFilter): Observable<ExchangeRate[]> => {
        return this.httpObservable.post<ExchangeRate[]>(kebabCase(nameof(this.list)), exchangeRateFilter)
            .pipe(map((response: AxiosResponse<ExchangeRate[]>) => response.data));
    };

    public get = (id: number | string): Observable<ExchangeRate> => {
        return this.httpObservable.post<ExchangeRate>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ExchangeRate>) => response.data));
    };

    public create = (exchangeRate: ExchangeRate): Observable<ExchangeRate> => {
        return this.httpObservable.post<ExchangeRate>(kebabCase(nameof(this.create)), exchangeRate)
            .pipe(map((response: AxiosResponse<ExchangeRate>) => response.data));
    };

    public update = (exchangeRate: ExchangeRate): Observable<ExchangeRate> => {
        return this.httpObservable.post<ExchangeRate>(kebabCase(nameof(this.update)), exchangeRate)
            .pipe(map((response: AxiosResponse<ExchangeRate>) => response.data));
    };

    public delete = (exchangeRate: ExchangeRate): Observable<ExchangeRate> => {
        return this.httpObservable.post<ExchangeRate>(kebabCase(nameof(this.delete)), exchangeRate)
            .pipe(map((response: AxiosResponse<ExchangeRate>) => response.data));
    };

    public save = (exchangeRate: ExchangeRate): Observable<ExchangeRate> => {
        return exchangeRate.id ? this.update(exchangeRate) : this.create(exchangeRate);
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

export const exchangeRateRepository = new ExchangeRateRepository();
