import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_CURRENCY_PREFIX } from "config/api-consts";
import { Currency, CurrencyFilter } from 'models/Currency';
import { Status, StatusFilter } from 'models/Status';

export class CurrencyRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_CURRENCY_PREFIX);
    }

    public count = (currencyFilter?: CurrencyFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), currencyFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (currencyFilter?: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.list)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };

    public get = (id: number | string): Observable<Currency> => {
        return this.httpObservable.post<Currency>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Currency>) => response.data));
    };

    public create = (currency: Currency): Observable<Currency> => {
        return this.httpObservable.post<Currency>(kebabCase(nameof(this.create)), currency)
            .pipe(map((response: AxiosResponse<Currency>) => response.data));
    };

    public update = (currency: Currency): Observable<Currency> => {
        return this.httpObservable.post<Currency>(kebabCase(nameof(this.update)), currency)
            .pipe(map((response: AxiosResponse<Currency>) => response.data));
    };

    public delete = (currency: Currency): Observable<Currency> => {
        return this.httpObservable.post<Currency>(kebabCase(nameof(this.delete)), currency)
            .pipe(map((response: AxiosResponse<Currency>) => response.data));
    };

    public save = (currency: Currency): Observable<Currency> => {
        return currency.id ? this.update(currency) : this.create(currency);
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
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

export const currencyRepository = new CurrencyRepository();
