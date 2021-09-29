import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROJECT_BUDGET_PREFIX } from "config/api-consts";
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';
import { Project, ProjectFilter } from 'models/Project';
import { ProjectBudgetEntry, ProjectBudgetEntryFilter } from 'models/ProjectBudgetEntry';
import { MonthKey, MonthKeyFilter } from 'models/MonthKey';
import { ProjectBudgetHistory, ProjectBudgetHistoryFilter } from 'models/ProjectBudgetHistory';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Status, StatusFilter } from 'models/Status';

export class ProjectBudgetRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROJECT_BUDGET_PREFIX);
    }

    public count = (projectBudgetFilter?: ProjectBudgetFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), projectBudgetFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (projectBudgetFilter?: ProjectBudgetFilter): Observable<ProjectBudget[]> => {
        return this.httpObservable.post<ProjectBudget[]>(kebabCase(nameof(this.list)), projectBudgetFilter)
            .pipe(map((response: AxiosResponse<ProjectBudget[]>) => response.data));
    };

    public get = (id: number | string): Observable<ProjectBudget> => {
        return this.httpObservable.post<ProjectBudget>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ProjectBudget>) => response.data));
    };

    public create = (projectBudget: ProjectBudget): Observable<ProjectBudget> => {
        return this.httpObservable.post<ProjectBudget>(kebabCase(nameof(this.create)), projectBudget)
            .pipe(map((response: AxiosResponse<ProjectBudget>) => response.data));
    };

    public update = (projectBudget: ProjectBudget): Observable<ProjectBudget> => {
        return this.httpObservable.post<ProjectBudget>(kebabCase(nameof(this.update)), projectBudget)
            .pipe(map((response: AxiosResponse<ProjectBudget>) => response.data));
    };

    public delete = (projectBudget: ProjectBudget): Observable<ProjectBudget> => {
        return this.httpObservable.post<ProjectBudget>(kebabCase(nameof(this.delete)), projectBudget)
            .pipe(map((response: AxiosResponse<ProjectBudget>) => response.data));
    };

    public save = (projectBudget: ProjectBudget): Observable<ProjectBudget> => {
        return projectBudget.id ? this.update(projectBudget) : this.create(projectBudget);
    };

    public singleListProject = (projectFilter: ProjectFilter): Observable<Project[]> => {
        return this.httpObservable.post<Project[]>(kebabCase(nameof(this.singleListProject)), projectFilter)
            .pipe(map((response: AxiosResponse<Project[]>) => response.data));
    };
    public singleListProjectBudgetEntry = (projectBudgetEntryFilter: ProjectBudgetEntryFilter): Observable<ProjectBudgetEntry[]> => {
        return this.httpObservable.post<ProjectBudgetEntry[]>(kebabCase(nameof(this.singleListProjectBudgetEntry)), projectBudgetEntryFilter)
            .pipe(map((response: AxiosResponse<ProjectBudgetEntry[]>) => response.data));
    };
    public singleListMonthKey = (): Observable<MonthKey[]> => {
        return this.httpObservable.post<MonthKey[]>(kebabCase(nameof(this.singleListMonthKey)), new MonthKeyFilter())
            .pipe(map((response: AxiosResponse<MonthKey[]>) => response.data));
    };
    public singleListProjectBudgetHistory = (projectBudgetHistoryFilter: ProjectBudgetHistoryFilter): Observable<ProjectBudgetHistory[]> => {
        return this.httpObservable.post<ProjectBudgetHistory[]>(kebabCase(nameof(this.singleListProjectBudgetHistory)), projectBudgetHistoryFilter)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
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

export const projectBudgetRepository = new ProjectBudgetRepository();
