import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_PLAN_CRITERION_SCORE_PREFIX } from "config/api-consts";
import { PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter } from 'models/PurchasePlanCriterionScore';
import { Criterion, CriterionFilter } from 'models/Criterion';
import { CriterionType, CriterionTypeFilter } from 'models/CriterionType';
import { PurchasePlan, PurchasePlanFilter } from 'models/PurchasePlan';

export class PurchasePlanCriterionScoreRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_PLAN_CRITERION_SCORE_PREFIX);
    }

    public count = (purchasePlanCriterionScoreFilter?: PurchasePlanCriterionScoreFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchasePlanCriterionScoreFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchasePlanCriterionScoreFilter?: PurchasePlanCriterionScoreFilter): Observable<PurchasePlanCriterionScore[]> => {
        return this.httpObservable.post<PurchasePlanCriterionScore[]>(kebabCase(nameof(this.list)), purchasePlanCriterionScoreFilter)
            .pipe(map((response: AxiosResponse<PurchasePlanCriterionScore[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchasePlanCriterionScore> => {
        return this.httpObservable.post<PurchasePlanCriterionScore>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchasePlanCriterionScore>) => response.data));
    };

    public create = (purchasePlanCriterionScore: PurchasePlanCriterionScore): Observable<PurchasePlanCriterionScore> => {
        return this.httpObservable.post<PurchasePlanCriterionScore>(kebabCase(nameof(this.create)), purchasePlanCriterionScore)
            .pipe(map((response: AxiosResponse<PurchasePlanCriterionScore>) => response.data));
    };

    public update = (purchasePlanCriterionScore: PurchasePlanCriterionScore): Observable<PurchasePlanCriterionScore> => {
        return this.httpObservable.post<PurchasePlanCriterionScore>(kebabCase(nameof(this.update)), purchasePlanCriterionScore)
            .pipe(map((response: AxiosResponse<PurchasePlanCriterionScore>) => response.data));
    };

    public delete = (purchasePlanCriterionScore: PurchasePlanCriterionScore): Observable<PurchasePlanCriterionScore> => {
        return this.httpObservable.post<PurchasePlanCriterionScore>(kebabCase(nameof(this.delete)), purchasePlanCriterionScore)
            .pipe(map((response: AxiosResponse<PurchasePlanCriterionScore>) => response.data));
    };

    public save = (purchasePlanCriterionScore: PurchasePlanCriterionScore): Observable<PurchasePlanCriterionScore> => {
        return purchasePlanCriterionScore.id ? this.update(purchasePlanCriterionScore) : this.create(purchasePlanCriterionScore);
    };

    public singleListCriterion = (criterionFilter: CriterionFilter): Observable<Criterion[]> => {
        return this.httpObservable.post<Criterion[]>(kebabCase(nameof(this.singleListCriterion)), criterionFilter)
            .pipe(map((response: AxiosResponse<Criterion[]>) => response.data));
    };
    public singleListCriterionType = (): Observable<CriterionType[]> => {
        return this.httpObservable.post<CriterionType[]>(kebabCase(nameof(this.singleListCriterionType)), new CriterionTypeFilter())
            .pipe(map((response: AxiosResponse<CriterionType[]>) => response.data));
    };
    public singleListPurchasePlan = (purchasePlanFilter: PurchasePlanFilter): Observable<PurchasePlan[]> => {
        return this.httpObservable.post<PurchasePlan[]>(kebabCase(nameof(this.singleListPurchasePlan)), purchasePlanFilter)
            .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
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

export const purchasePlanCriterionScoreRepository = new PurchasePlanCriterionScoreRepository();
