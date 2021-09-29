import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_CRITERION_GROUPING_PREFIX } from "config/api-consts";
import { CriterionGrouping, CriterionGroupingFilter } from 'models/CriterionGrouping';
import { Status, StatusFilter } from 'models/Status';

export class CriterionGroupingRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_CRITERION_GROUPING_PREFIX);
    }

    public count = (criterionGroupingFilter?: CriterionGroupingFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), criterionGroupingFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (criterionGroupingFilter?: CriterionGroupingFilter): Observable<CriterionGrouping[]> => {
        return this.httpObservable.post<CriterionGrouping[]>(kebabCase(nameof(this.list)), criterionGroupingFilter)
            .pipe(map((response: AxiosResponse<CriterionGrouping[]>) => response.data));
    };

    public get = (id: number | string): Observable<CriterionGrouping> => {
        return this.httpObservable.post<CriterionGrouping>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<CriterionGrouping>) => response.data));
    };

    public create = (criterionGrouping: CriterionGrouping): Observable<CriterionGrouping> => {
        return this.httpObservable.post<CriterionGrouping>(kebabCase(nameof(this.create)), criterionGrouping)
            .pipe(map((response: AxiosResponse<CriterionGrouping>) => response.data));
    };

    public update = (criterionGrouping: CriterionGrouping): Observable<CriterionGrouping> => {
        return this.httpObservable.post<CriterionGrouping>(kebabCase(nameof(this.update)), criterionGrouping)
            .pipe(map((response: AxiosResponse<CriterionGrouping>) => response.data));
    };

    public delete = (criterionGrouping: CriterionGrouping): Observable<CriterionGrouping> => {
        return this.httpObservable.post<CriterionGrouping>(kebabCase(nameof(this.delete)), criterionGrouping)
            .pipe(map((response: AxiosResponse<CriterionGrouping>) => response.data));
    };

    public save = (criterionGrouping: CriterionGrouping): Observable<CriterionGrouping> => {
        return criterionGrouping.id ? this.update(criterionGrouping) : this.create(criterionGrouping);
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

export const criterionGroupingRepository = new CriterionGroupingRepository();
