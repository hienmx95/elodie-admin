import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROJECT_BUDGET_HISTORY_ENTRY_PREFIX } from "config/api-consts";
import { ProjectBudgetHistoryEntry, ProjectBudgetHistoryEntryFilter } from 'models/ProjectBudgetHistoryEntry';
import { MonthKey, MonthKeyFilter } from 'models/MonthKey';
import { ProjectBudgetHistory, ProjectBudgetHistoryFilter } from 'models/ProjectBudgetHistory';

export class ProjectBudgetHistoryEntryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROJECT_BUDGET_HISTORY_ENTRY_PREFIX);
    }

    public count = (projectBudgetHistoryEntryFilter?: ProjectBudgetHistoryEntryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), projectBudgetHistoryEntryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (projectBudgetHistoryEntryFilter?: ProjectBudgetHistoryEntryFilter): Observable<ProjectBudgetHistoryEntry[]> => {
        return this.httpObservable.post<ProjectBudgetHistoryEntry[]>(kebabCase(nameof(this.list)), projectBudgetHistoryEntryFilter)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistoryEntry[]>) => response.data));
    };

    public get = (id: number | string): Observable<ProjectBudgetHistoryEntry> => {
        return this.httpObservable.post<ProjectBudgetHistoryEntry>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ProjectBudgetHistoryEntry>) => response.data));
    };

    public create = (projectBudgetHistoryEntry: ProjectBudgetHistoryEntry): Observable<ProjectBudgetHistoryEntry> => {
        return this.httpObservable.post<ProjectBudgetHistoryEntry>(kebabCase(nameof(this.create)), projectBudgetHistoryEntry)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistoryEntry>) => response.data));
    };

    public update = (projectBudgetHistoryEntry: ProjectBudgetHistoryEntry): Observable<ProjectBudgetHistoryEntry> => {
        return this.httpObservable.post<ProjectBudgetHistoryEntry>(kebabCase(nameof(this.update)), projectBudgetHistoryEntry)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistoryEntry>) => response.data));
    };

    public delete = (projectBudgetHistoryEntry: ProjectBudgetHistoryEntry): Observable<ProjectBudgetHistoryEntry> => {
        return this.httpObservable.post<ProjectBudgetHistoryEntry>(kebabCase(nameof(this.delete)), projectBudgetHistoryEntry)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistoryEntry>) => response.data));
    };

    public save = (projectBudgetHistoryEntry: ProjectBudgetHistoryEntry): Observable<ProjectBudgetHistoryEntry> => {
        return projectBudgetHistoryEntry.id ? this.update(projectBudgetHistoryEntry) : this.create(projectBudgetHistoryEntry);
    };

    public singleListMonthKey = (): Observable<MonthKey[]> => {
        return this.httpObservable.post<MonthKey[]>(kebabCase(nameof(this.singleListMonthKey)), new MonthKeyFilter())
            .pipe(map((response: AxiosResponse<MonthKey[]>) => response.data));
    };
    public singleListProjectBudgetHistory = (projectBudgetHistoryFilter: ProjectBudgetHistoryFilter): Observable<ProjectBudgetHistory[]> => {
        return this.httpObservable.post<ProjectBudgetHistory[]>(kebabCase(nameof(this.singleListProjectBudgetHistory)), projectBudgetHistoryFilter)
            .pipe(map((response: AxiosResponse<ProjectBudgetHistory[]>) => response.data));
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

export const projectBudgetHistoryEntryRepository = new ProjectBudgetHistoryEntryRepository();
