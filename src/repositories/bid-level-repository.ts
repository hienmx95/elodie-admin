import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_BID_LEVEL_PREFIX } from "config/api-consts";
import { BidLevel, BidLevelFilter } from 'models/BidLevel';
import { Status, StatusFilter } from 'models/Status';

export class BidLevelRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_BID_LEVEL_PREFIX);
    }

    public count = (bidLevelFilter?: BidLevelFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), bidLevelFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (bidLevelFilter?: BidLevelFilter): Observable<BidLevel[]> => {
        return this.httpObservable.post<BidLevel[]>(kebabCase(nameof(this.list)), bidLevelFilter)
            .pipe(map((response: AxiosResponse<BidLevel[]>) => response.data));
    };

    public get = (id: number | string): Observable<BidLevel> => {
        return this.httpObservable.post<BidLevel>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<BidLevel>) => response.data));
    };

    public create = (bidLevel: BidLevel): Observable<BidLevel> => {
        return this.httpObservable.post<BidLevel>(kebabCase(nameof(this.create)), bidLevel)
            .pipe(map((response: AxiosResponse<BidLevel>) => response.data));
    };

    public update = (bidLevel: BidLevel): Observable<BidLevel> => {
        return this.httpObservable.post<BidLevel>(kebabCase(nameof(this.update)), bidLevel)
            .pipe(map((response: AxiosResponse<BidLevel>) => response.data));
    };

    public delete = (bidLevel: BidLevel): Observable<BidLevel> => {
        return this.httpObservable.post<BidLevel>(kebabCase(nameof(this.delete)), bidLevel)
            .pipe(map((response: AxiosResponse<BidLevel>) => response.data));
    };

    public save = (bidLevel: BidLevel): Observable<BidLevel> => {
        return bidLevel.id ? this.update(bidLevel) : this.create(bidLevel);
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

export const bidLevelRepository = new BidLevelRepository();
