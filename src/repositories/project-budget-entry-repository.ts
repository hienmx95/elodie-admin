import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROJECT_BUDGET_ENTRY_PREFIX } from "config/api-consts";
import { ProjectBudgetEntry, ProjectBudgetEntryFilter } from 'models/ProjectBudgetEntry';
import { MonthKey, MonthKeyFilter } from 'models/MonthKey';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';

export class ProjectBudgetEntryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROJECT_BUDGET_ENTRY_PREFIX);
    }

    public count = (projectBudgetEntryFilter?: ProjectBudgetEntryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), projectBudgetEntryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (projectBudgetEntryFilter?: ProjectBudgetEntryFilter): Observable<ProjectBudgetEntry[]> => {
        return this.httpObservable.post<ProjectBudgetEntry[]>(kebabCase(nameof(this.list)), projectBudgetEntryFilter)
            .pipe(map((response: AxiosResponse<ProjectBudgetEntry[]>) => response.data));
    };

    public get = (id: number | string): Observable<ProjectBudgetEntry> => {
        return this.httpObservable.post<ProjectBudgetEntry>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ProjectBudgetEntry>) => response.data));
    };

    public create = (projectBudgetEntry: ProjectBudgetEntry): Observable<ProjectBudgetEntry> => {
        return this.httpObservable.post<ProjectBudgetEntry>(kebabCase(nameof(this.create)), projectBudgetEntry)
            .pipe(map((response: AxiosResponse<ProjectBudgetEntry>) => response.data));
    };

    public update = (projectBudgetEntry: ProjectBudgetEntry): Observable<ProjectBudgetEntry> => {
        return this.httpObservable.post<ProjectBudgetEntry>(kebabCase(nameof(this.update)), projectBudgetEntry)
            .pipe(map((response: AxiosResponse<ProjectBudgetEntry>) => response.data));
    };

    public delete = (projectBudgetEntry: ProjectBudgetEntry): Observable<ProjectBudgetEntry> => {
        return this.httpObservable.post<ProjectBudgetEntry>(kebabCase(nameof(this.delete)), projectBudgetEntry)
            .pipe(map((response: AxiosResponse<ProjectBudgetEntry>) => response.data));
    };

    public save = (projectBudgetEntry: ProjectBudgetEntry): Observable<ProjectBudgetEntry> => {
        return projectBudgetEntry.id ? this.update(projectBudgetEntry) : this.create(projectBudgetEntry);
    };

    public singleListMonthKey = (): Observable<MonthKey[]> => {
        return this.httpObservable.post<MonthKey[]>(kebabCase(nameof(this.singleListMonthKey)), new MonthKeyFilter())
            .pipe(map((response: AxiosResponse<MonthKey[]>) => response.data));
    };
    public singleListProjectBudget = (projectBudgetFilter: ProjectBudgetFilter): Observable<ProjectBudget[]> => {
        return this.httpObservable.post<ProjectBudget[]>(kebabCase(nameof(this.singleListProjectBudget)), projectBudgetFilter)
            .pipe(map((response: AxiosResponse<ProjectBudget[]>) => response.data));
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

export const projectBudgetEntryRepository = new ProjectBudgetEntryRepository();
