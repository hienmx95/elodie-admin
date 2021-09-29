import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_CRITERION_PREFIX } from "config/api-consts";
import { Criterion, CriterionFilter } from 'models/Criterion';
import { CriterionGrouping, CriterionGroupingFilter } from 'models/CriterionGrouping';
import { CriterionType, CriterionTypeFilter } from 'models/CriterionType';
import { Status, StatusFilter } from 'models/Status';

export class CriterionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_CRITERION_PREFIX);
    }

    public count = (criterionFilter?: CriterionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), criterionFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (criterionFilter?: CriterionFilter): Observable<Criterion[]> => {
        return this.httpObservable.post<Criterion[]>(kebabCase(nameof(this.list)), criterionFilter)
            .pipe(map((response: AxiosResponse<Criterion[]>) => response.data));
    };

    public get = (id: number | string): Observable<Criterion> => {
        return this.httpObservable.post<Criterion>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Criterion>) => response.data));
    };

    public create = (criterion: Criterion): Observable<Criterion> => {
        return this.httpObservable.post<Criterion>(kebabCase(nameof(this.create)), criterion)
            .pipe(map((response: AxiosResponse<Criterion>) => response.data));
    };

    public update = (criterion: Criterion): Observable<Criterion> => {
        return this.httpObservable.post<Criterion>(kebabCase(nameof(this.update)), criterion)
            .pipe(map((response: AxiosResponse<Criterion>) => response.data));
    };

    public delete = (criterion: Criterion): Observable<Criterion> => {
        return this.httpObservable.post<Criterion>(kebabCase(nameof(this.delete)), criterion)
            .pipe(map((response: AxiosResponse<Criterion>) => response.data));
    };

    public save = (criterion: Criterion): Observable<Criterion> => {
        return criterion.id ? this.update(criterion) : this.create(criterion);
    };

    public singleListCriterionGrouping = (criterionGroupingFilter: CriterionGroupingFilter): Observable<CriterionGrouping[]> => {
        return this.httpObservable.post<CriterionGrouping[]>(kebabCase(nameof(this.singleListCriterionGrouping)), criterionGroupingFilter)
            .pipe(map((response: AxiosResponse<CriterionGrouping[]>) => response.data));
    };
    public singleListCriterionType = (): Observable<CriterionType[]> => {
        return this.httpObservable.post<CriterionType[]>(kebabCase(nameof(this.singleListCriterionType)), new CriterionTypeFilter())
            .pipe(map((response: AxiosResponse<CriterionType[]>) => response.data));
    };
    public filterListCriterionType = (): Observable<CriterionType[]> => {
        return this.httpObservable.post<CriterionType[]>(kebabCase(nameof(this.filterListCriterionType)), new CriterionTypeFilter())
            .pipe(map((response: AxiosResponse<CriterionType[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public filterListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.filterListStatus)), new StatusFilter())
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

export const criterionRepository = new CriterionRepository();
