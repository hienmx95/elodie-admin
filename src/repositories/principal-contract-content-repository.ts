import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRINCIPAL_CONTRACT_CONTENT_PREFIX } from "config/api-consts";
import { PrincipalContractContent, PrincipalContractContentFilter } from 'models/PrincipalContractContent';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
import { PrincipalContract, PrincipalContractFilter } from 'models/PrincipalContract';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class PrincipalContractContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRINCIPAL_CONTRACT_CONTENT_PREFIX);
    }

    public count = (principalContractContentFilter?: PrincipalContractContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), principalContractContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (principalContractContentFilter?: PrincipalContractContentFilter): Observable<PrincipalContractContent[]> => {
        return this.httpObservable.post<PrincipalContractContent[]>(kebabCase(nameof(this.list)), principalContractContentFilter)
            .pipe(map((response: AxiosResponse<PrincipalContractContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<PrincipalContractContent> => {
        return this.httpObservable.post<PrincipalContractContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PrincipalContractContent>) => response.data));
    };

    public create = (principalContractContent: PrincipalContractContent): Observable<PrincipalContractContent> => {
        return this.httpObservable.post<PrincipalContractContent>(kebabCase(nameof(this.create)), principalContractContent)
            .pipe(map((response: AxiosResponse<PrincipalContractContent>) => response.data));
    };

    public update = (principalContractContent: PrincipalContractContent): Observable<PrincipalContractContent> => {
        return this.httpObservable.post<PrincipalContractContent>(kebabCase(nameof(this.update)), principalContractContent)
            .pipe(map((response: AxiosResponse<PrincipalContractContent>) => response.data));
    };

    public delete = (principalContractContent: PrincipalContractContent): Observable<PrincipalContractContent> => {
        return this.httpObservable.post<PrincipalContractContent>(kebabCase(nameof(this.delete)), principalContractContent)
            .pipe(map((response: AxiosResponse<PrincipalContractContent>) => response.data));
    };

    public save = (principalContractContent: PrincipalContractContent): Observable<PrincipalContractContent> => {
        return principalContractContent.id ? this.update(principalContractContent) : this.create(principalContractContent);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListPrincipalContract = (principalContractFilter: PrincipalContractFilter): Observable<PrincipalContract[]> => {
        return this.httpObservable.post<PrincipalContract[]>(kebabCase(nameof(this.singleListPrincipalContract)), principalContractFilter)
            .pipe(map((response: AxiosResponse<PrincipalContract[]>) => response.data));
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

export const principalContractContentRepository = new PrincipalContractContentRepository();
