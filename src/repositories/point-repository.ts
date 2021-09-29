import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_POINT_PREFIX } from "config/api-consts";
import { Point, PointFilter } from 'models/Point';

export class PointRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_POINT_PREFIX);
    }

    public count = (pointFilter?: PointFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), pointFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (pointFilter?: PointFilter): Observable<Point[]> => {
        return this.httpObservable.post<Point[]>(kebabCase(nameof(this.list)), pointFilter)
            .pipe(map((response: AxiosResponse<Point[]>) => response.data));
    };

    public get = (id: number | string): Observable<Point> => {
        return this.httpObservable.post<Point>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Point>) => response.data));
    };

    public create = (point: Point): Observable<Point> => {
        return this.httpObservable.post<Point>(kebabCase(nameof(this.create)), point)
            .pipe(map((response: AxiosResponse<Point>) => response.data));
    };

    public update = (point: Point): Observable<Point> => {
        return this.httpObservable.post<Point>(kebabCase(nameof(this.update)), point)
            .pipe(map((response: AxiosResponse<Point>) => response.data));
    };

    public delete = (point: Point): Observable<Point> => {
        return this.httpObservable.post<Point>(kebabCase(nameof(this.delete)), point)
            .pipe(map((response: AxiosResponse<Point>) => response.data));
    };

    public save = (point: Point): Observable<Point> => {
        return point.id ? this.update(point) : this.create(point);
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

export const pointRepository = new PointRepository();
