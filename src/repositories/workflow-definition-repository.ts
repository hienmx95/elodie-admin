import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_DEFINITION_PREFIX } from "config/api-consts";
import { WorkflowDefinition, WorkflowDefinitionFilter } from 'models/WorkflowDefinition';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Status, StatusFilter } from 'models/Status';
import { WorkflowType, WorkflowTypeFilter } from 'models/WorkflowType';

export class WorkflowDefinitionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_DEFINITION_PREFIX);
    }

    public count = (workflowDefinitionFilter?: WorkflowDefinitionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowDefinitionFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowDefinitionFilter?: WorkflowDefinitionFilter): Observable<WorkflowDefinition[]> => {
        return this.httpObservable.post<WorkflowDefinition[]>(kebabCase(nameof(this.list)), workflowDefinitionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDefinition[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowDefinition> => {
        return this.httpObservable.post<WorkflowDefinition>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowDefinition>) => response.data));
    };

    public create = (workflowDefinition: WorkflowDefinition): Observable<WorkflowDefinition> => {
        return this.httpObservable.post<WorkflowDefinition>(kebabCase(nameof(this.create)), workflowDefinition)
            .pipe(map((response: AxiosResponse<WorkflowDefinition>) => response.data));
    };

    public update = (workflowDefinition: WorkflowDefinition): Observable<WorkflowDefinition> => {
        return this.httpObservable.post<WorkflowDefinition>(kebabCase(nameof(this.update)), workflowDefinition)
            .pipe(map((response: AxiosResponse<WorkflowDefinition>) => response.data));
    };

    public delete = (workflowDefinition: WorkflowDefinition): Observable<WorkflowDefinition> => {
        return this.httpObservable.post<WorkflowDefinition>(kebabCase(nameof(this.delete)), workflowDefinition)
            .pipe(map((response: AxiosResponse<WorkflowDefinition>) => response.data));
    };

    public save = (workflowDefinition: WorkflowDefinition): Observable<WorkflowDefinition> => {
        return workflowDefinition.id ? this.update(workflowDefinition) : this.create(workflowDefinition);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public filterListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.filterListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };

    public filterListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.filterListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListWorkflowType = (workflowTypeFilter: WorkflowTypeFilter): Observable<WorkflowType[]> => {
        return this.httpObservable.post<WorkflowType[]>(kebabCase(nameof(this.singleListWorkflowType)), workflowTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowType[]>) => response.data));
    };
    public filterListWorkflowType = (workflowTypeFilter: WorkflowTypeFilter): Observable<WorkflowType[]> => {
        return this.httpObservable.post<WorkflowType[]>(kebabCase(nameof(this.filterListWorkflowType)), workflowTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowType[]>) => response.data));
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

    public clone = (id: number | string): Observable<WorkflowDefinition> => {
        return this.httpObservable.post<WorkflowDefinition>
            (kebabCase(nameof(this.clone)), { id })
            .pipe(map((response: AxiosResponse<WorkflowDefinition>) => response.data));
    };


}

export const workflowDefinitionRepository = new WorkflowDefinitionRepository();
