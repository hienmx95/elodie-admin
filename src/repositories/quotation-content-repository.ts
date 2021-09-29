import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_QUOTATION_CONTENT_PREFIX } from "config/api-consts";
import { QuotationContent, QuotationContentFilter } from 'models/QuotationContent';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Quotation, QuotationFilter } from 'models/Quotation';
import { RequestForQuotationContent, RequestForQuotationContentFilter } from 'models/RequestForQuotationContent';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class QuotationContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_QUOTATION_CONTENT_PREFIX);
    }

    public count = (quotationContentFilter?: QuotationContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), quotationContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (quotationContentFilter?: QuotationContentFilter): Observable<QuotationContent[]> => {
        return this.httpObservable.post<QuotationContent[]>(kebabCase(nameof(this.list)), quotationContentFilter)
            .pipe(map((response: AxiosResponse<QuotationContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<QuotationContent> => {
        return this.httpObservable.post<QuotationContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<QuotationContent>) => response.data));
    };

    public create = (quotationContent: QuotationContent): Observable<QuotationContent> => {
        return this.httpObservable.post<QuotationContent>(kebabCase(nameof(this.create)), quotationContent)
            .pipe(map((response: AxiosResponse<QuotationContent>) => response.data));
    };

    public update = (quotationContent: QuotationContent): Observable<QuotationContent> => {
        return this.httpObservable.post<QuotationContent>(kebabCase(nameof(this.update)), quotationContent)
            .pipe(map((response: AxiosResponse<QuotationContent>) => response.data));
    };

    public delete = (quotationContent: QuotationContent): Observable<QuotationContent> => {
        return this.httpObservable.post<QuotationContent>(kebabCase(nameof(this.delete)), quotationContent)
            .pipe(map((response: AxiosResponse<QuotationContent>) => response.data));
    };

    public save = (quotationContent: QuotationContent): Observable<QuotationContent> => {
        return quotationContent.id ? this.update(quotationContent) : this.create(quotationContent);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListQuotation = (quotationFilter: QuotationFilter): Observable<Quotation[]> => {
        return this.httpObservable.post<Quotation[]>(kebabCase(nameof(this.singleListQuotation)), quotationFilter)
            .pipe(map((response: AxiosResponse<Quotation[]>) => response.data));
    };
    public singleListRequestForQuotationContent = (requestForQuotationContentFilter: RequestForQuotationContentFilter): Observable<RequestForQuotationContent[]> => {
        return this.httpObservable.post<RequestForQuotationContent[]>(kebabCase(nameof(this.singleListRequestForQuotationContent)), requestForQuotationContentFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotationContent[]>) => response.data));
    };
    public singleListTaxType = (taxTypeFilter: TaxTypeFilter): Observable<TaxType[]> => {
        return this.httpObservable.post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
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

export const quotationContentRepository = new QuotationContentRepository();
