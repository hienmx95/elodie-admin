import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROJECT_BUDGET_HISTORY_PREFIX } from "config/api-consts";
import { ProjectBudgetHistory, ProjectBudgetHistoryFilter } from 'models/ProjectBudgetHistory';
import { Currency, CurrencyFilter } from 'models/Currency';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';
import { Status, StatusFilter } from 'models/Status';

export class ProjectBudgetHistoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROJECT_BUDGET_HISTORY_PREFIX);
    }

    public count = (projectBudgetHistoryFilter?: ProjectBudgetHistoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), projectBudgetHistoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (projectBudgetHistoryFilter?: ProjectBudgetHistoryFilter): Observable<ProjectBudgetHistory[]> => {
        return this.httpObservable.post<ProjectBudgetHistory[]>(kebabCase(nameof(this.list)), projectBudgetHistoryFilter)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory[]>) => response.data));
    };

    public get = (id: number | string): Observable<ProjectBudgetHistory> => {
        return this.httpObservable.post<ProjectBudgetHistory>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory>) => response.data));
    };

    public create = (projectBudgetHistory: ProjectBudgetHistory): Observable<ProjectBudgetHistory> => {
        return this.httpObservable.post<ProjectBudgetHistory>(kebabCase(nameof(this.create)), projectBudgetHistory)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory>) => response.data));
    };

    public update = (projectBudgetHistory: ProjectBudgetHistory): Observable<ProjectBudgetHistory> => {
        return this.httpObservable.post<ProjectBudgetHistory>(kebabCase(nameof(this.update)), projectBudgetHistory)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory>) => response.data));
    };

    public delete = (projectBudgetHistory: ProjectBudgetHistory): Observable<ProjectBudgetHistory> => {
        return this.httpObservable.post<ProjectBudgetHistory>(kebabCase(nameof(this.delete)), projectBudgetHistory)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory>) => response.data));
    };

    public save = (projectBudgetHistory: ProjectBudgetHistory): Observable<ProjectBudgetHistory> => {
        return projectBudgetHistory.id ? this.update(projectBudgetHistory) : this.create(projectBudgetHistory);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListProjectBudget = (projectBudgetFilter: ProjectBudgetFilter): Observable<ProjectBudget[]> => {
        return this.httpObservable.post<ProjectBudget[]>(kebabCase(nameof(this.singleListProjectBudget)), projectBudgetFilter)
            .pipe(map((response: AxiosResponse<ProjectBudget[]>) => response.data));
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

export const projectBudgetHistoryRepository = new ProjectBudgetHistoryRepository();
