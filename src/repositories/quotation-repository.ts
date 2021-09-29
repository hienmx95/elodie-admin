import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_QUOTATION_PREFIX } from "config/api-consts";
import { Quotation, QuotationFilter } from 'models/Quotation';
import { PurchasePlan, PurchasePlanFilter } from 'models/PurchasePlan';
import { RequestForQuotation, RequestForQuotationFilter } from 'models/RequestForQuotation';
import { SupplierUser, SupplierUserFilter } from 'models/SupplierUser';
import { Status, StatusFilter } from 'models/Status';
import { Supplier, SupplierFilter } from 'models/Supplier';
import { QuotationCondition, QuotationConditionFilter } from 'models/QuotationCondition';
import { QuotationContent, QuotationContentFilter } from 'models/QuotationContent';
import { Currency, CurrencyFilter } from 'models/Currency';
import { RequestForQuotationContent, RequestForQuotationContentFilter } from 'models/RequestForQuotationContent';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { QuotationHistory, QuotationHistoryFilter } from 'models/QuotationHistory';

export class QuotationRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_QUOTATION_PREFIX);
    }

    public count = (quotationFilter?: QuotationFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), quotationFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (quotationFilter?: QuotationFilter): Observable<Quotation[]> => {
        return this.httpObservable.post<Quotation[]>(kebabCase(nameof(this.list)), quotationFilter)
            .pipe(map((response: AxiosResponse<Quotation[]>) => response.data));
    };

    public get = (id: number | string): Observable<Quotation> => {
        return this.httpObservable.post<Quotation>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Quotation>) => response.data));
    };

    public create = (quotation: Quotation): Observable<Quotation> => {
        return this.httpObservable.post<Quotation>(kebabCase(nameof(this.create)), quotation)
            .pipe(map((response: AxiosResponse<Quotation>) => response.data));
    };

    public update = (quotation: Quotation): Observable<Quotation> => {
        return this.httpObservable.post<Quotation>(kebabCase(nameof(this.update)), quotation)
            .pipe(map((response: AxiosResponse<Quotation>) => response.data));
    };

    public delete = (quotation: Quotation): Observable<Quotation> => {
        return this.httpObservable.post<Quotation>(kebabCase(nameof(this.delete)), quotation)
            .pipe(map((response: AxiosResponse<Quotation>) => response.data));
    };

    public save = (quotation: Quotation): Observable<Quotation> => {
        return quotation.id ? this.update(quotation) : this.create(quotation);
    };

    public singleListPurchasePlan = (purchasePlanFilter: PurchasePlanFilter): Observable<PurchasePlan[]> => {
        return this.httpObservable.post<PurchasePlan[]>(kebabCase(nameof(this.singleListPurchasePlan)), purchasePlanFilter)
            .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
    };
    public singleListRequestForQuotation = (requestForQuotationFilter: RequestForQuotationFilter): Observable<RequestForQuotation[]> => {
        return this.httpObservable.post<RequestForQuotation[]>(kebabCase(nameof(this.singleListRequestForQuotation)), requestForQuotationFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotation[]>) => response.data));
    };
    public singleListSupplierUser = (supplierUserFilter: SupplierUserFilter): Observable<SupplierUser[]> => {
        return this.httpObservable.post<SupplierUser[]>(kebabCase(nameof(this.singleListSupplierUser)), supplierUserFilter)
            .pipe(map((response: AxiosResponse<SupplierUser[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
    };
    public singleListQuotationCondition = (quotationConditionFilter: QuotationConditionFilter): Observable<QuotationCondition[]> => {
        return this.httpObservable.post<QuotationCondition[]>(kebabCase(nameof(this.singleListQuotationCondition)), quotationConditionFilter)
            .pipe(map((response: AxiosResponse<QuotationCondition[]>) => response.data));
    };
    public singleListQuotationContent = (quotationContentFilter: QuotationContentFilter): Observable<QuotationContent[]> => {
        return this.httpObservable.post<QuotationContent[]>(kebabCase(nameof(this.singleListQuotationContent)), quotationContentFilter)
            .pipe(map((response: AxiosResponse<QuotationContent[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
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

export const quotationRepository = new QuotationRepository();
