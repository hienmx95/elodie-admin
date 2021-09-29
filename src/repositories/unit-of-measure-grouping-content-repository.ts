import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_UNIT_OF_MEASURE_GROUPING_CONTENT_PREFIX } from "config/api-consts";
import { UnitOfMeasureGroupingContent, UnitOfMeasureGroupingContentFilter } from 'models/UnitOfMeasureGroupingContent';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { UnitOfMeasureGrouping, UnitOfMeasureGroupingFilter } from 'models/UnitOfMeasureGrouping';

export class UnitOfMeasureGroupingContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_UNIT_OF_MEASURE_GROUPING_CONTENT_PREFIX);
    }

    public count = (unitOfMeasureGroupingContentFilter?: UnitOfMeasureGroupingContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), unitOfMeasureGroupingContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (unitOfMeasureGroupingContentFilter?: UnitOfMeasureGroupingContentFilter): Observable<UnitOfMeasureGroupingContent[]> => {
        return this.httpObservable.post<UnitOfMeasureGroupingContent[]>(kebabCase(nameof(this.list)), unitOfMeasureGroupingContentFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGroupingContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<UnitOfMeasureGroupingContent> => {
        return this.httpObservable.post<UnitOfMeasureGroupingContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<UnitOfMeasureGroupingContent>) => response.data));
    };

    public create = (unitOfMeasureGroupingContent: UnitOfMeasureGroupingContent): Observable<UnitOfMeasureGroupingContent> => {
        return this.httpObservable.post<UnitOfMeasureGroupingContent>(kebabCase(nameof(this.create)), unitOfMeasureGroupingContent)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGroupingContent>) => response.data));
    };

    public update = (unitOfMeasureGroupingContent: UnitOfMeasureGroupingContent): Observable<UnitOfMeasureGroupingContent> => {
        return this.httpObservable.post<UnitOfMeasureGroupingContent>(kebabCase(nameof(this.update)), unitOfMeasureGroupingContent)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGroupingContent>) => response.data));
    };

    public delete = (unitOfMeasureGroupingContent: UnitOfMeasureGroupingContent): Observable<UnitOfMeasureGroupingContent> => {
        return this.httpObservable.post<UnitOfMeasureGroupingContent>(kebabCase(nameof(this.delete)), unitOfMeasureGroupingContent)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGroupingContent>) => response.data));
    };

    public save = (unitOfMeasureGroupingContent: UnitOfMeasureGroupingContent): Observable<UnitOfMeasureGroupingContent> => {
        return unitOfMeasureGroupingContent.id ? this.update(unitOfMeasureGroupingContent) : this.create(unitOfMeasureGroupingContent);
    };

    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
    };
    public singleListUnitOfMeasureGrouping = (unitOfMeasureGroupingFilter: UnitOfMeasureGroupingFilter): Observable<UnitOfMeasureGrouping[]> => {
        return this.httpObservable.post<UnitOfMeasureGrouping[]>(kebabCase(nameof(this.singleListUnitOfMeasureGrouping)), unitOfMeasureGroupingFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping[]>) => response.data));
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

export const unitOfMeasureGroupingContentRepository = new UnitOfMeasureGroupingContentRepository();
