import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_TRADE_CONDITION_PREFIX } from "config/api-consts";
import { TradeCondition, TradeConditionFilter } from 'models/TradeCondition';
import { Status, StatusFilter } from 'models/Status';
import { TradeConditionType, TradeConditionTypeFilter } from 'models/TradeConditionType';

export class TradeConditionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_TRADE_CONDITION_PREFIX);
    }

    public count = (tradeConditionFilter?: TradeConditionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), tradeConditionFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (tradeConditionFilter?: TradeConditionFilter): Observable<TradeCondition[]> => {
        return this.httpObservable.post<TradeCondition[]>(kebabCase(nameof(this.list)), tradeConditionFilter)
            .pipe(map((response: AxiosResponse<TradeCondition[]>) => response.data));
    };

    public get = (id: number | string): Observable<TradeCondition> => {
        return this.httpObservable.post<TradeCondition>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<TradeCondition>) => response.data));
    };

    public create = (tradeCondition: TradeCondition): Observable<TradeCondition> => {
        return this.httpObservable.post<TradeCondition>(kebabCase(nameof(this.create)), tradeCondition)
            .pipe(map((response: AxiosResponse<TradeCondition>) => response.data));
    };

    public update = (tradeCondition: TradeCondition): Observable<TradeCondition> => {
        return this.httpObservable.post<TradeCondition>(kebabCase(nameof(this.update)), tradeCondition)
            .pipe(map((response: AxiosResponse<TradeCondition>) => response.data));
    };

    public delete = (tradeCondition: TradeCondition): Observable<TradeCondition> => {
        return this.httpObservable.post<TradeCondition>(kebabCase(nameof(this.delete)), tradeCondition)
            .pipe(map((response: AxiosResponse<TradeCondition>) => response.data));
    };

    public save = (tradeCondition: TradeCondition): Observable<TradeCondition> => {
        return tradeCondition.id ? this.update(tradeCondition) : this.create(tradeCondition);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public filterListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.filterListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListTradeConditionType = (): Observable<TradeConditionType[]> => {
        return this.httpObservable.post<TradeConditionType[]>(kebabCase(nameof(this.singleListTradeConditionType)), new TradeConditionTypeFilter())
            .pipe(map((response: AxiosResponse<TradeConditionType[]>) => response.data));
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

export const tradeConditionRepository = new TradeConditionRepository();
