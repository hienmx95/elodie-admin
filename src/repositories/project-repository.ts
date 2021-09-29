import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROJECT_PREFIX } from "config/api-consts";
import { Project, ProjectFilter } from 'models/Project';
import { Currency, CurrencyFilter } from 'models/Currency';
import { MonthKey, MonthKeyFilter } from 'models/MonthKey';
import { Organization, OrganizationFilter } from 'models/Organization';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';

export class ProjectRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROJECT_PREFIX);
    }

    public count = (projectFilter?: ProjectFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), projectFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (projectFilter?: ProjectFilter): Observable<Project[]> => {
        return this.httpObservable.post<Project[]>(kebabCase(nameof(this.list)), projectFilter)
            .pipe(map((response: AxiosResponse<Project[]>) => response.data));
    };

    public get = (id: number | string): Observable<Project> => {
        return this.httpObservable.post<Project>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Project>) => response.data));
    };

    public create = (project: Project): Observable<Project> => {
        return this.httpObservable.post<Project>(kebabCase(nameof(this.create)), project)
            .pipe(map((response: AxiosResponse<Project>) => response.data));
    };

    public update = (project: Project): Observable<Project> => {
        return this.httpObservable.post<Project>(kebabCase(nameof(this.update)), project)
            .pipe(map((response: AxiosResponse<Project>) => response.data));
    };

    public delete = (project: Project): Observable<Project> => {
        return this.httpObservable.post<Project>(kebabCase(nameof(this.delete)), project)
            .pipe(map((response: AxiosResponse<Project>) => response.data));
    };

    public save = (project: Project): Observable<Project> => {
        return project.id ? this.update(project) : this.create(project);
    };

    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListMonthKey = (): Observable<MonthKey[]> => {
        return this.httpObservable.post<MonthKey[]>(kebabCase(nameof(this.singleListMonthKey)), new MonthKeyFilter())
            .pipe(map((response: AxiosResponse<MonthKey[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListProject = (projectFilter: ProjectFilter): Observable<Project[]> => {
        return this.httpObservable.post<Project[]>(kebabCase(nameof(this.singleListProject)), projectFilter)
            .pipe(map((response: AxiosResponse<Project[]>) => response.data));
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

export const projectRepository = new ProjectRepository();
