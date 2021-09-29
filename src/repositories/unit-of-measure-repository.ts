import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_UNIT_OF_MEASURE_PREFIX } from "config/api-consts";
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { Status, StatusFilter } from 'models/Status';

export class UnitOfMeasureRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_UNIT_OF_MEASURE_PREFIX);
    }

    public count = (unitOfMeasureFilter?: UnitOfMeasureFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (unitOfMeasureFilter?: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.list)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
    };

    public get = (id: number | string): Observable<UnitOfMeasure> => {
        return this.httpObservable.post<UnitOfMeasure>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<UnitOfMeasure>) => response.data));
    };

    public create = (unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> => {
        return this.httpObservable.post<UnitOfMeasure>(kebabCase(nameof(this.create)), unitOfMeasure)
            .pipe(map((response: AxiosResponse<UnitOfMeasure>) => response.data));
    };

    public update = (unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> => {
        return this.httpObservable.post<UnitOfMeasure>(kebabCase(nameof(this.update)), unitOfMeasure)
            .pipe(map((response: AxiosResponse<UnitOfMeasure>) => response.data));
    };

    public delete = (unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> => {
        return this.httpObservable.post<UnitOfMeasure>(kebabCase(nameof(this.delete)), unitOfMeasure)
            .pipe(map((response: AxiosResponse<UnitOfMeasure>) => response.data));
    };

    public save = (unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> => {
        return unitOfMeasure.id ? this.update(unitOfMeasure) : this.create(unitOfMeasure);
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

export const unitOfMeasureRepository = new UnitOfMeasureRepository();
