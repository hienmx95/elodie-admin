import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_MASTER_BUDGET_PREFIX } from "config/api-consts";
import { MasterBudget, MasterBudgetFilter } from 'models/MasterBudget';

export class MasterBudgetRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_MASTER_BUDGET_PREFIX);
    }

    public count = (masterBudgetFilter?: MasterBudgetFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), masterBudgetFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (masterBudgetFilter?: MasterBudgetFilter): Observable<MasterBudget[]> => {
        return this.httpObservable.post<MasterBudget[]>(kebabCase(nameof(this.list)), masterBudgetFilter)
            .pipe(map((response: AxiosResponse<MasterBudget[]>) => response.data));
    };

    public get = (id: number | string): Observable<MasterBudget> => {
        return this.httpObservable.post<MasterBudget>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<MasterBudget>) => response.data));
    };

    public create = (masterBudget: MasterBudget): Observable<MasterBudget> => {
        return this.httpObservable.post<MasterBudget>(kebabCase(nameof(this.create)), masterBudget)
            .pipe(map((response: AxiosResponse<MasterBudget>) => response.data));
    };

    public update = (masterBudget: MasterBudget): Observable<MasterBudget> => {
        return this.httpObservable.post<MasterBudget>(kebabCase(nameof(this.update)), masterBudget)
            .pipe(map((response: AxiosResponse<MasterBudget>) => response.data));
    };

    public delete = (masterBudget: MasterBudget): Observable<MasterBudget> => {
        return this.httpObservable.post<MasterBudget>(kebabCase(nameof(this.delete)), masterBudget)
            .pipe(map((response: AxiosResponse<MasterBudget>) => response.data));
    };

    public save = (masterBudget: MasterBudget): Observable<MasterBudget> => {
        return masterBudget.id ? this.update(masterBudget) : this.create(masterBudget);
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

export const masterBudgetRepository = new MasterBudgetRepository();
