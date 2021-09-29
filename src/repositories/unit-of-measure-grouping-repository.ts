import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_UNIT_OF_MEASURE_GROUPING_PREFIX } from "config/api-consts";
import { UnitOfMeasureGrouping, UnitOfMeasureGroupingFilter } from 'models/UnitOfMeasureGrouping';
import { Status, StatusFilter } from 'models/Status';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class UnitOfMeasureGroupingRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_UNIT_OF_MEASURE_GROUPING_PREFIX);
    }

    public count = (unitOfMeasureGroupingFilter?: UnitOfMeasureGroupingFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), unitOfMeasureGroupingFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (unitOfMeasureGroupingFilter?: UnitOfMeasureGroupingFilter): Observable<UnitOfMeasureGrouping[]> => {
        return this.httpObservable.post<UnitOfMeasureGrouping[]>(kebabCase(nameof(this.list)), unitOfMeasureGroupingFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping[]>) => response.data));
    };

    public get = (id: number | string): Observable<UnitOfMeasureGrouping> => {
        return this.httpObservable.post<UnitOfMeasureGrouping>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping>) => response.data));
    };

    public create = (unitOfMeasureGrouping: UnitOfMeasureGrouping): Observable<UnitOfMeasureGrouping> => {
        return this.httpObservable.post<UnitOfMeasureGrouping>(kebabCase(nameof(this.create)), unitOfMeasureGrouping)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping>) => response.data));
    };

    public update = (unitOfMeasureGrouping: UnitOfMeasureGrouping): Observable<UnitOfMeasureGrouping> => {
        return this.httpObservable.post<UnitOfMeasureGrouping>(kebabCase(nameof(this.update)), unitOfMeasureGrouping)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping>) => response.data));
    };

    public delete = (unitOfMeasureGrouping: UnitOfMeasureGrouping): Observable<UnitOfMeasureGrouping> => {
        return this.httpObservable.post<UnitOfMeasureGrouping>(kebabCase(nameof(this.delete)), unitOfMeasureGrouping)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping>) => response.data));
    };

    public save = (unitOfMeasureGrouping: UnitOfMeasureGrouping): Observable<UnitOfMeasureGrouping> => {
        return unitOfMeasureGrouping.id ? this.update(unitOfMeasureGrouping) : this.create(unitOfMeasureGrouping);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };

    public filterListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.filterListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
    };

    public filterListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.filterListUnitOfMeasure)), unitOfMeasureFilter)
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

export const unitOfMeasureGroupingRepository = new UnitOfMeasureGroupingRepository();
